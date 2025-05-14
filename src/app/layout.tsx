import type { Metadata } from 'next';
import { Inter, Limelight } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const limeLight = Limelight({
  weight: '400',
  variable: '--font-lime-light',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | DevStore',
    default: 'DevStore',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={` ${inter.variable} antialiased`}
      lang="pt"
    >
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  );
}
