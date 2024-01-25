import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Main',
  description: 'Main Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body>{children}</body>
    </html>
  );
}
