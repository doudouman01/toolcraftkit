import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

const pdfParse = require('pdf-parse');

const TOOL_SLUG = 'pdf-to-word';
const FREE_LIMIT = 3;
const PERIOD = 'month';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function isHeading(line: string): false | 'h1' | 'h2' {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // Short all-caps lines are likely H1
  if (trimmed.length <= 80 && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
    return 'h1';
  }

  // Short lines (under 60 chars) that don't end with common sentence punctuation
  if (trimmed.length <= 60 && !/[.,;:!?]$/.test(trimmed) && /[A-Za-z]/.test(trimmed)) {
    return 'h2';
  }

  return false;
}

function buildDocxFromText(text: string): Document {
  const lines = text.split('\n');
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line → spacing paragraph
    if (!trimmed) {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [],
        })
      );
      continue;
    }

    const headingType = isHeading(trimmed);

    if (headingType === 'h1') {
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              font: 'Calibri',
              size: 32, // 16pt
            }),
          ],
        })
      );
    } else if (headingType === 'h2') {
      paragraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              font: 'Calibri',
              size: 26, // 13pt
            }),
          ],
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 80, line: 276 }, // 1.15 line spacing
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: trimmed,
              font: 'Calibri',
              size: 22, // 11pt
            }),
          ],
        })
      );
    }
  }

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are accepted' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // --- Usage check ---
    const supabase = createServiceClient();
    let isPro = false;

    if (!userId) {
      return NextResponse.json(
        { error: 'Login required to use this tool', reason: 'login_required', limit: FREE_LIMIT, period: PERIOD },
        { status: 401 }
      );
    }

    // Check if user is pro
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', userId)
      .single();

    if (profile?.subscription_status === 'active') {
      isPro = true;
    }

    if (!isPro) {
      // Check usage count for free user
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const { count } = await supabase
        .from('usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('tool_slug', TOOL_SLUG)
        .gte('used_at', startDate);

      const currentUsage = count || 0;

      if (currentUsage >= FREE_LIMIT) {
        return NextResponse.json(
          {
            error: 'Monthly limit reached. Upgrade to Pro for unlimited conversions.',
            reason: 'limit_reached',
            usage: currentUsage,
            limit: FREE_LIMIT,
            period: PERIOD,
          },
          { status: 429 }
        );
      }
    }

    // --- Convert PDF to Word ---
    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    let pdfData;
    try {
      pdfData = await pdfParse(pdfBuffer);
    } catch (parseError: any) {
      console.error('PDF parse error:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse PDF. The file may be corrupted or password-protected.' },
        { status: 422 }
      );
    }

    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'No text could be extracted from this PDF. It may be a scanned image PDF.' },
        { status: 422 }
      );
    }

    // Build the DOCX document
    const doc = buildDocxFromText(extractedText);

    // Generate the .docx buffer
    const docxBuffer = await Packer.toBuffer(doc);

    // Record usage on success
    await supabase.from('usage_logs').insert({
      user_id: userId,
      tool_slug: TOOL_SLUG,
    });

    // Generate filename from original PDF name
    const originalName = file.name.replace(/\.pdf$/i, '');
    const outputFilename = `${originalName}.docx`;

    // Return the .docx file as binary
    return new Response(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${outputFilename}"`,
        'Content-Length': docxBuffer.byteLength.toString(),
      },
    });
  } catch (err: any) {
    console.error('PDF to Word API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred during conversion.' },
      { status: 500 }
    );
  }
}
