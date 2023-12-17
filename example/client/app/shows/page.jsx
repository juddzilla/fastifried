'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

import API from '../api';

export default function() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    API.Shows()
        .then(res => {
          setShows(res);
        })
        .catch(err => {
          console.error('ERR', err);
        });
  }, []);

  return (
      <div className="w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Shows</h1>
            <p className="mt-2 text-sm text-gray-700">
              Shows constantly on rotation
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Show
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 align-middle sm:px-6 lg:px-8 w-9/12">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Network
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Seasons
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                { shows.map((show) => (
                    <tr key={ show.name }>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link href={ `/shows/${show.name}` }>{ show.name }</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ show.streamer }</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ show.seasons }</td>
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
