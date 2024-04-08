import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const list = ['first', 'second', 'third', 'fourth', 'fifth'];

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>----Layout-----</header>
        <nav className="flex gap-3">
          {list.map((item, index) => (
            <Link href={`/test/${item}`} key={index}>
              {item}
            </Link>
          ))}
        </nav>
        <section>{children}</section>
      </body>
    </html>
  );
}
