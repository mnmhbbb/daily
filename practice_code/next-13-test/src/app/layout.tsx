import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 13 버전 공부하기',
  description: 'Next.js 13버전으로 프로젝트를 만들면서 새로운 기능을 적용해 봅니다.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <header className="w-full flex justify-between items-center border-b-2 border-indigo-700">
            <h1>
              <Link href="/" className="p-5">
                Hello Next.js 13
              </Link>
            </h1>

            <nav>
              <ul className="flex gap-2">
                <li className="p-5">
                  <Link href="/hello">Hello</Link>
                </li>
                <li className="p-5">
                  <a href="/products">Products</a>
                </li>
              </ul>
            </nav>
          </header>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
