import './globals.css'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata = {
  title: 'Tripundo - Verified Group Travel for Tech Professionals',
  description:
    'Find trustworthy travel partners through LinkedIn-verified professional identity, destination communities, and trip history. Plan, coordinate, and travel safely.',
  metadataBase: new URL('https://tripundo.in'),
  openGraph: {
    title: 'Tripundo - Verified Group Travel for Tech Professionals',
    description: 'Trustworthy travel partners. LinkedIn-verified. Destination communities. Beautiful trip stories.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#07140d] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
