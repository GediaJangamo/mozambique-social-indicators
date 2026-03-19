import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atlas do Desenvolvimento · Moçambique',
  description: 'Dashboard interativo de indicadores sociais de Moçambique. Explore a evolução em educação, saúde, energia e bem-estar social — visualize no mapa, analise em tabela ou exporte os dados.',
  generator: 'v0.app',
  keywords: ['Moçambique', 'desenvolvimento', 'indicadores sociais', 'dashboard', 'mapa', 'estatísticas'],
  authors: [{ name: 'Development Atlas' }],
  openGraph: {
    title: 'Atlas do Desenvolvimento · Moçambique',
    description: 'Dashboard interativo de indicadores sociais de Moçambique',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#faf8f5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}




