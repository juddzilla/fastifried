'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

import API from '../api';

export default function() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    API.Characters()
        .then(res => {
          setCharacters(res);
        })
        .catch(err => {
          console.error('ERR', err);
        });
  }, []);

  return (
      <div className="w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Characters</h1>
            <p className="mt-2 text-sm text-gray-700">
              Fav Characters
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Character
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 align-middle sm:px-6 lg:px-8 w-full">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Show
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tagline
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                { characters.map((character) => (
                    <tr key={ character.name }>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link href={ `characters/${ character.name }` }>{ character.name }</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ character.show }</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ character.tagline }</td>
                    </tr>
                )) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
