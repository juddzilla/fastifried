'use client'

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import API from '@/app/api';
import { AuthContext } from '@/app/components/auth-context';
import Heading from '@/app/components/Heading';
import { ContentTable } from '@/styles/styles';

export default function() {
  const [characters, setCharacters] = useState([]);
  const authed = useContext(AuthContext);

  useEffect(() => {
    API.CharactersList()
      .then(res => {
        setCharacters(res);
      })
      .catch(err => {
        console.error('ERR', err);
      });
  }, []);

  async function removeCharacter(index) {
    try {
      const removeCharacter = characters[index];
      await API.CharactersRemove(removeCharacter);
      characters.splice(index, 1);
      setCharacters([...characters]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
      <>
        <Heading
            main='Characters'
        />

        <div className={ ContentTable }>
          <div className="w-full">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Show
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-sm text-right font-semibold text-gray-900"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  { characters.map((character, index) => (
                      <tr key={ character.name }>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <Link href={ `characters/${ character.name }` }>{ character.name }</Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Link href={ `shows/${ character.show }` }>{ character.show }</Link><
                        /td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          { authed.loggedIn &&
                            <button onClick={ () => removeCharacter(index) } className="p-2 rounded border border-transparent text-primary hover:border-primary">
                              Remove<span className="sr-only">, { character.show }</span>
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
    </>
  )
}
