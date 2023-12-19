'use client'

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useContext, useEffect, useState } from 'react';

import API from '@/app/api';
import { AuthProvider } from '@/app/components/auth-provider.jsx';
import Heading from '@/app/components/Heading';
import { ContentTable } from '@/styles/styles';

export default function() {
  const [show, setShow] = useState({ name: null, seasons: null, streamer: null });
  const [characters, setCharacters] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCharacter, setNewCharacter] = useState('');
  const authed = useContext(AuthProvider);

  const path = usePathname()
  const parts = path.trim().split('/');

  useEffect(() => {
    API.ShowsDetail({ name: parts[parts.length - 1] })
      .then(res => {
        setShow(res.show);
        console.log('RES', res.show);
        setCharacters(res.characters);
      })
      .catch(err => {
        console.error('ERR', err);
      });
  }, []);

  async function saveNewCharacter() {
    try {
      const req = await API.CharactersCreate({ name: newCharacter, show: show.name });
      characters.push(req);
      setCharacters([...characters]);
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }

  async function removeCharacter(index) {
    try {
      const req = await API.CharactersRemove({ name, show: show.name });
      characters.splice(index, 1);
      setCharacters([...characters]);
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }

  const actions = [
    {
      display: 'Add Character',
      hidden: !authed.loggedIn,
      onClick: () => { setOpen(!open) }
    }
  ];

  return (
    <>
      <Heading
          actions={ actions }
          bottom={ `${ show.seasons || 'Funny' } Seasons` }
          main={ show.name }
          top={ show.streamer }
      />
      <div className={ ContentTable }>
        <div className="w-full">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 bg-white">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Quote
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                { characters.map((character, index) => (
                    <tr key={character.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link href={ `/characters/${character.name}` }>
                          { character.name }
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ character.quote }</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                        { authed.loggedIn &&
                          <button onClick={ () => removeCharacter(index) } className="p-2 rounded border border-transparent text-primary hover:border-primary">
                            Remove<span className="sr-only">, { character.name }</span>
                          </button>
                        }
                      </td>
                    </tr>
                )) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                    <div className="sm:mt-5">
                      <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                        Add { show.name } Character
                      </Dialog.Title>
                      <div className="mt-4">
                        <input
                            type="text"
                            name="name"
                            id="character-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6"
                            placeholder="enter character name"
                            value={ newCharacter }
                            onChange={ (e) => setNewCharacter(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                        disabled={ !newCharacter.trim().length }
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary disabled:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        onClick={ saveNewCharacter }
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
    </>
  )
}
