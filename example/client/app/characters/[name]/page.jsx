'use client'

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/20/solid';

import API from '@/app/api';
import { AuthProvider } from "@/app/components/auth-provider.jsx";
import Heading from '@/app/components/Heading';

export default function() {
  const [character, setCharacter] = useState({ name: '', quote: null });
  const [newQuote, setNewQuote] = useState('');
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const authed = useContext(AuthProvider);

  const path = usePathname()
  const parts = path.trim().split('/');

  async function saveQuote() {
    try {
      const req = await API.CharactersUpdate({ name: character.name, quote: newQuote })
      setCharacter(req);
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }

  useEffect(() => {
    setLoggedIn(authed.loggedIn);
  }, [authed]);

  useEffect(() => {
    API.CharactersDetail({ name: parts[parts.length - 1] })
        .then(res => {
          setCharacter(res);
          setNewQuote(res.quote);
        })
        .catch(err => {
          console.error('ERR', err);
        });
  }, []);

  const actions = [
    {
      display: 'Edit Quote',
      hidden: !loggedIn || character.quote === null  || !character.quote.trim().length,
      onClick: () => { setOpen(!open) }
    }
  ]

  console.log('character', character.quote);

  return (
      <div className='h-full flex-col flex'>
        <Heading
            actions={ actions }
            main={ character.name }
            top={ character.show }
        />
        <div className='bg-gray-800 flex-1'>
          { character.quote === null &&
            <div className="blockquote-wrapper -mt-32">
              <div className="blockquote">
                <h1>
                  <span>Loading</span>
                </h1>
              </div>
            </div>
          }
          { (character.quote && character.quote !== null && !character.quote.trim().length) &&
              <div className="text-center">
                <h3 className="mt-2 text-sm font-semibold text-gray-50">No Quote</h3>
                <p className="mt-1 text-sm text-gray-500">What's your favorite quote from this character</p>
                <div className="mt-6">
                  <button
                      className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      onClick={ () => setOpen(true) }
                      type="button"
                  >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    New Quote
                  </button>
                </div>
              </div>
          }
          { character.quote !== null  && character.quote.trim().length &&
            <div className="blockquote-wrapper -mt-32">
              <div className="blockquote">
                <h1>
                  { character.quote }
                </h1>
              </div>
            </div>
          }
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="">
                        <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                          { character.name } Quote
                        </Dialog.Title>
                        <div className="mt-4">
                          <textarea
                              type="text"
                              name="quote"
                              id="new-quote"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6"
                              placeholder="..."
                              value={ newQuote }
                              onChange={(e) => setNewQuote(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                          disabled={ !newQuote.trim().length }
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary disabled:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          onClick={ saveQuote }
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
  )
}
