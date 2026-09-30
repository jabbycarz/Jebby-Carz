import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jebby Carz | Headlamp Repair & Restoration Singapore',
  description: 'Jebby Carz — specialist car headlamp repair, restoration, lens replacement, DRL repair and lighting solutions in Singapore.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
