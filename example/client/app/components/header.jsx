'use client'

import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext, useState } from 'react';

import API from '@/app/api';
import { AuthProvider } from '@/app/components/auth-provider.jsx';

const navigation = [
  { name: 'Shows', href: '/shows' },
  { name: 'Characters', href: '/characters' },
]

 export default () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const authed = useContext(AuthProvider);

   async function login() {
     try {
       await API.AuthLogin();
       authed.changeLoggedIn(true);
     } catch (err) {
       console.error(err);
     }
   }

   async function logout() {
     try {
       await API.AuthLogout();
       authed.changeLoggedIn(false);
     } catch (err) {
       console.error(err);
     }
   }

   async function authToggle() {
     if (authed.loggedIn) {
       await logout();
     } else {
       await login();
     }
   }

   let authMessage = 'Hi';

   if (authed.loggedIn === true) {
     authMessage = 'Logout';
   } else if (authed.loggedIn === false) {
     authMessage = 'Login';
   }

   return (
     <header className="bg-secondary">
       <div className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
         <nav className="w-full flex items-center justify-between" aria-label="Global">
           <div className="flex lg:flex-1">
             <Link href='/' className="-m-1.5 p-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
               </svg>
             </Link>
           </div>
           <div className="flex lg:hidden">
             <button
                 type="button"
                 className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                 onClick={() => setMobileMenuOpen(true)}
             >
               <span className="sr-only">Open main menu</span>
               <Bars3Icon className="h-6 w-6" aria-hidden="true" />
             </button>
           </div>
           <div className="hidden lg:flex lg:gap-x-12">
             {navigation.map((item) => (
                 <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                   {item.name}
                 </a>
             ))}
           </div>
           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
             <button onClick={ authToggle }  className="text-sm font-semibold leading-6 text-white">
               <span>{ authMessage }</span>
             </button>
           </div>
         </nav>
       </div>
       <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
         <div className="fixed inset-0 z-10" />
         <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
           <div className="flex items-center justify-between">
             <a href="#" className="-m-1.5 p-1.5">
               <span className="sr-only">Your Company</span>
               <img
                   className="h-8 w-auto"
                   src="https://tailwindui.com/img/logos/mark.svg?color=white"
                   alt=""
               />
             </a>
             <button
                 type="button"
                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
                 onClick={() => setMobileMenuOpen(false)}
             >
               <span className="sr-only">Close menu</span>
               <XMarkIcon className="h-6 w-6" aria-hidden="true" />
             </button>
           </div>
           <div className="mt-6 flow-root">
             <div className="-my-6 divide-y divide-gray-500/10">
               <div className="space-y-2 py-6">
                 {navigation.map((item) => (
                     <a
                         key={item.name}
                         href={item.href}
                         className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                     >
                       {item.name}
                     </a>
                 ))}
               </div>
               <div className="py-6">
                 <button onClick={ authToggle } className=" font-semibold leading-6">
                   <span>{ authMessage }</span>
                 </button>
               </div>
             </div>
           </div>
         </Dialog.Panel>
       </Dialog>
     </header>
   )
 }