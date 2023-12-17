import { Inter } from 'next/font/google';
import Header from './components/header.jsx';

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
      <body className="">
        <Header />
        <div className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
          { children }
        </div>
      </body>
    </html>
  )
}
