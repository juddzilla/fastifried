// This file will be consumed by the client

import PublicHostRoutes from './paths.json' assert { type: 'json' };

const HostPaths = Object.keys(PublicHostRoutes);

const request = async (url, opts) => {
  const options = {
    credentials: 'include',
    ...opts,
  };
  try {
    const req = await fetch(url, options);
    return await req.json();
  } catch (error) {
    return { error };
  }
};

/**
 * Generates a set of functions for handling routes based on the provided host paths.
 *
 * @param {String} hostUrl - An string of the Host URL.
 * @param {Object} userHeaders - An object user defined request Headers.
 * @returns {Object} An object with functions for handling routes based on host paths.
 */
export default function API(hostUrl, userHeaders) {
  const headers = { 'Content-Type': 'application/json', ...userHeaders };

  const Fetch = {
    DELETE: (url) => request(url, { method: 'DELETE', headers }),
    GET: (url) => request(url),
    POST: (url, body) => request(url, { method: 'POST', headers, body }),
    PUT: (url, body) => request(url, { method: 'PUT', headers, body }),
  };

  /**
   * Generates an object with a JSON stringified body, query string, and concatenated URL.
   *
   * @param {Object} options - The options object.
   * @param {Object} options.data - The data object containing parameters for the request body.
   * @param {string} options.path - The path string with optional parameters specified as ':param'.
   * @param {string} options.search - The search string with query parameters.
   * @returns {Object} An object with a JSON stringified body, query string, and concatenated URL.
   */
  const withBodyData = ({ data, path, search }) => {
    // Initialize the target with the provided path
    let target = path;

    // Generate a query string from the 'search' property
    const query = !search ? null : new URLSearchParams(search).toString();

    // Generate a body object by replacing path parameters and collecting non-path parameters
    const body = !data ? null : Object.keys(data).reduce((acc, key) => {
      const param = `:${key}`;

      // If the path contains the parameter, replace it with the corresponding data value
      if (path.includes(param)) {
        target = target.replace(param, data[key]);
      } else {
        // Otherwise, add the non-path parameter to the body
        acc[key] = data[key];
      }

      return acc;
    }, {});

    // Return an object with the JSON stringified body, query, and concatenated URL
    return {
      /**
       * The JSON stringified body for the request.
       * @type {string|null}
       */
      body: JSON.stringify(body),
      /**
       * The query string for the request.
       * @type {string|null}
       */
      query,
      /**
       * The concatenated URL for the request.
       * @type {string}
       */
      url: [hostUrl, target].join(''),
    };
  };

  /**
   * Generates an object with a query string and concatenated URL from URL parameters.
   *
   * @param {Object} options - The options object.
   * @param {string} options.path - The path string with optional parameters specified as ':param'.
   * @param {Object} options.search - The search object containing URL parameters.
   * @returns {Object} An object with a query string and concatenated URL.
   */
  const withUrlParamsData = ({ path, search }) => {
    let target = path;

    // Generate a params object by replacing path parameters and collecting non-path parameters
    const params = !search ? null : Object.keys(search).reduce((acc, key) => {
      const param = `:${key}`;

      // If the path contains the parameter, replace it with the corresponding search value
      if (path.includes(param)) {
        target = target.replace(param, search[key]);
      } else {
        // Otherwise, add the non-path parameter to the params object
        acc[key] = search[key];
      }

      return acc;
    }, {});

    // Generate a query string from the params object
    const query = !params ? null : new URLSearchParams(params).toString();

    // Return an object with the query string and concatenated URL
    return {
      /**
       * The query string for the request.
       * @type {string|null}
       */
      query,
      /**
       * The concatenated URL for the request.
       * @type {string}
       */
      url: [hostUrl, target].join(''),
    };
  };

  /**
   * Sends a request with a JSON body using the provided route and data.
   *
   * @param {Object} route - The route object containing method and path information.
   * @param {Object} data - The data object containing parameters for the request body.
   * @returns {Promise} A promise representing the result of the fetch operation.
   */
  const withBody = (route, data) => {
    const { method, path } = route;
    const config = withBodyData({ path, data });
    const { body, url } = config;
    return Fetch[method.toUpperCase()](url, body);
  };

  /**
   * Sends a request with URL parameters using the provided route and search parameters.
   *
   * @param {Object} route - The route object containing method and path information.
   * @param {Object} search - The search object containing URL parameters.
   * @returns {Promise} A promise representing the result of the fetch operation.
   */
  const withUrlParams = (route, search) => {
    const { method, path } = route;
    const config = withUrlParamsData({ path, search });
    const { query, url } = config;
    const uri = query ? [url, query].join('?') : url;
    return Fetch[method.toUpperCase()](uri);
  };

  const methodMap = {
    DELETE: withUrlParams,
    GET: withUrlParams,
    POST: withBody,
    PUT: withBody,
  };


  return HostPaths.reduce((acc, key) => {
    // Retrieve the route object for the current host key
    const route = PublicHostRoutes[key];
    // Bind the corresponding function to the route and store it in the accumulator
    acc[key] = methodMap[route.method.toUpperCase()].bind(null, route);
    return acc;
  }, {});
}