'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import API from '../../api.js';

export default function() {
  const [character, setCharacter] = useState({});
  const path = usePathname()
  const parts = path.trim().split('/');

  useEffect(() => {
    API.Character({ name: parts[parts.length - 1] })
        .then(res => {
          setCharacter(res);
        })
        .catch(err => {
          console.error('ERR', err);
        });
  }, []);

  return (
      <div className="w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Character: { character.name }</h1>
            <p className="mt-2 text-sm text-gray-700">
              { character.show }
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 align-middle sm:px-6 lg:px-8 w-full">
              <h2>{ character.quote }</h2>
            </div>
          </div>
        </div>
      </div>
  )
}
