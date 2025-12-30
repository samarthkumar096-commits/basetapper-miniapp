import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BaseTapper - Tap to Earn Gems',
  description: 'Tap to earn gems and win $BTAP tokens! Mine, compete, and climb the leaderboard.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-512.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#10b981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body>{children}</body>
    </html>
  )
}
