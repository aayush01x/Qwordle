import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Wordle Clone',
  description: 'A Wordle clone built with Next.js and shadcn/ui',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
