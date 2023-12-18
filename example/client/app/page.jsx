'use client'

import { useRouter } from 'next/navigation';

import Heading from '@/app/components/Heading';

export default () => {
  const router = useRouter();

  const actions = [
    { display: 'Shows', onClick: () => { router.push('/shows') } },
    { display: 'Characters', onClick: () => { router.push('/characters')} }
  ];

  return (
      <div>
        <Heading
            actions={ actions }
            bottom='Recently'
            top='Favorite'
            main='Comedies'
        />
        <div className='-mt-20 rounded-lg overflow-hidden mx-auto max-w-7xl shadow-lg'>
          <div className='bg-white text-xl h-20 flex items-center lg:px-8'>
            “If anyone is feeling anxious, worried or maybe you just want a chat, please, please do not come crying to me.”
          </div>
          <div className='bg-gray-800 text-lg h-20 flex items-center justify-end lg:px-8 text-right text-white'>
            – Sister Michael, Derry Girls
          </div>
        </div>
      </div>
  )
}