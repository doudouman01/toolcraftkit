import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { getDocumentProxy } from 'unpdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

const TOOL_SLUG = 'pdf-to-word';
const FREE_LIMIT = 3;
const PERIOD = 'month';

// ─── Usage helpers ────────────────────────────────────────
async function checkUsage(userId: string) {
  const supabase = createServiceClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', userId)
    .single();

  if (profile?.subscription_status === 'active') {
    return { allowed: true, isPro: true, usage: 0, limit: 999 };
  }

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('tool_slug', TOOL_SLUG)
    .gte('used_at', startDate);

  const currentUsage = count || 0;
  return { allowed: currentUsage < FREE_LIMIT, isPro: false, usage: currentUsage, limit: FREE_LIMIT };
}

async function recordUsage(userId: string) {
  const supabase = createServiceClient();
  await supabase.from('usage_logs').insert({ user_id: userId, tool_slug: TOOL_SLUG });
}

// ─── PDF text extraction using unpdf ──────────────────────
async function extractPdfText(buffer: ArrayBuffer): Promise<string[]> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    pages.push(pageText);
  }

  return pages;
}

// ─── Build DOCX from extracted text ───────────────────────
function buildDocx(pages: string[], fileName: string): Document {
  const children: Paragraph[] = [];

  // Title
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: fileName.replace(/\.pdf$/i, ''),
          bold: true,
          size: 32,
          font: 'Calibri',
        }),
      ],
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
    })
  );

  for (let i = 0; i < pages.length; i++) {
    const pageText = pages[i];
    if (!pageText) continue;

    // Page separator (except first page)
    if (i > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `— Page ${i + 1} —`,
              bold: true,
              size: 20,
              font: 'Calibri',
              color: '666666',
            }),
          ],
          spacing: { before: 400, after: 200 },
          alignment: AlignmentType.CENTER,
        })
      );
    }

    // Split text into sentences/paragraphs
    const sentences = pageText.split(/(?<=[.!?])\s+/);
    let currentParagraph: string[] = [];

    for (const sentence of sentences) {
      currentParagraph.push(sentence);

      // Group ~3-4 sentences per paragraph for readability
      if (currentParagraph.length >= 3 || sentence.length > 200) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: currentParagraph.join(' '),
                size: 22,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 120 },
          })
        );
        currentParagraph = [];
      }
    }

    // Remaining text
    if (currentParagraph.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: currentParagraph.join(' '),
              size: 22,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 120 },
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
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });
}

// ─── MAIN HANDLER ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'no_file' }, { status: 400 });
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'invalid_type', message: 'Please upload a PDF file.' }, { status: 415 });
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'file_too_large', message: 'Maximum file size is 10MB.' }, { status: 413 });
    }

    // Check auth
    if (!userId) {
      return NextResponse.json({ error: 'login_required' }, { status: 401 });
    }

    // Check usage
    const usage = await checkUsage(userId);
    if (!usage.allowed) {
      return NextResponse.json({ error: 'limit_reached', usage: usage.usage, limit: usage.limit }, { status: 429 });
    }

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer();
    let pages: string[];

    try {
      pages = await extractPdfText(arrayBuffer);
    } catch (err: any) {
      return NextResponse.json({
        error: 'pdf_error',
        message: 'Could not read this PDF. It may be encrypted, corrupted, or contain only images (scanned documents).',
      }, { status: 422 });
    }

    // Check if we got any text
    const totalText = pages.join(' ').trim();
    if (!totalText || totalText.length < 10) {
      return NextResponse.json({
        error: 'no_text',
        message: 'This PDF appears to contain only images or scanned content. Text-based PDFs are required for conversion.',
      }, { status: 422 });
    }

    // Build DOCX
    const doc = buildDocx(pages, file.name);
    const docxBuffer = await Packer.toBuffer(doc);

    // Record usage
    await recordUsage(userId);

    // Return DOCX file
    const outputName = file.name.replace(/\.pdf$/i, '.docx');
    return new Response(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': String(docxBuffer.byteLength),
      },
    });
  } catch (err: any) {
    console.error('PDF to Word error:', err);
    return NextResponse.json({
      error: 'server_error',
      message: err.message || 'An unexpected error occurred.',
    }, { status: 500 });
  }
}
