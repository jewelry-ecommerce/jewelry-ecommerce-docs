import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AppShell } from '@/components/layout/AppShell';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jewelry Commerce Docs',
    template: '%s | Jewelry Commerce Docs',
  },
  description:
    'Tài liệu nghiệp vụ cho đồ án tốt nghiệp Jewelry Commerce — 10 Epics, 54 User Stories, E2E Flows và Business Rules.',
  keywords: ['jewelry', 'e-commerce', 'documentation', 'user stories', 'graduation project'],
  authors: [{ name: 'Jewelry Commerce Team' }],
  openGraph: {
    type: 'website',
    title: 'Jewelry Commerce – Graduation Project Docs',
    description: 'BA Documentation: 10 Epics, 54 User Stories, AI Jewelry Stylist flagship feature.',
    siteName: 'Jewelry Docs',
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
