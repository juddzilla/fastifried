import { Inter } from 'next/font/google';
import Header from './components/header.jsx';

import AuthWrapper from './components/auth-context';

import '@/styles/tailwind.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: '%s - Fastifried',
    default: 'Fastifried - Eveything is better fried.',
  },
  description:
    'Automatic Client consumable API Helper',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={ `h-full antialiased ${ inter.variable }` }
    >
      <body className="bg-gray-100 h-full">
        <AuthWrapper>
          <Header />
          { children }
        </AuthWrapper>
      </body>
    </html>
  )
}
