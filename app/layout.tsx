import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BaseTapper - Tap to Earn Gems',
  description: 'Tap to earn gems and win $BTAP tokens! Mine, compete, and climb the leaderboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
