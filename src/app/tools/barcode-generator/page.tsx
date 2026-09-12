import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Barcode Generator — Generate barcodes online for free | ToolCraftKit',
  description: 'Generate barcodes online for free. CODE128, EAN-13, UPC, CODE39, ITF-14. Download as PNG.',
  openGraph: {
    title: 'Barcode Generator — Generate barcodes online for free | ToolCraftKit',
    description: 'Generate barcodes online for free. CODE128, EAN-13, UPC, CODE39, ITF-14. Download as PNG.',
    url: 'https://toolcraftkit.com/tools/barcode-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Barcode Generator — Generate barcodes online for free | ToolCraftKit',
    description: 'Generate barcodes online for free. CODE128, EAN-13, UPC, CODE39, ITF-14. Download as PNG.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/barcode-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
