import Publish from './routing/publish';
import findRoutes from './routing/find-routes';

/**
 * Configures and registers Fastify routes and publishes the route configuration.
 *
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} options - The options object.
 * @param {string} options.distDirectory - The directory where the output files will be stored.
 * @param {string} options.distFileName - The name of the output JavaScript file.
 * @param {Array<Object>|undefined} options.routes - An array of route objects or undefined to discover routes dynamically.
 * @param {string} options.routesDirectory - The directory where route files are located if routes are not provided.
 * @param {boolean} options.useNamedExport - If true, Fastifried will use the name export 'route' in the files from options.routesDirectory
 * @returns {Promise<Object>} A promise that resolves to the configured Fastify instance.
 * @throws {Error} Throws an error if required options are not provided or if there is an issue with route configuration or publishing.
 */
export default async (fastify, options) => {
  const { routes, useNamedExport, ...rest } = options;


  if (routes &&!Array.isArray(routes)) {
    throw new Error('options.routes must be an array of Fastify routes. See https://fastify.dev/docs/latest/Reference/Routes/#routes-options');
  }

  if (!Object.keys(rest).every(opt => typeof options[opt] === 'string' && Boolean(options[opt]))) {
    throw new Error('Option paths must be strings');
  }

  const { distDirectory, routesDirectory } = rest;

  // Ensure required options are provided
  if (![distDirectory].every(opt => typeof opt === 'string' && Boolean(opt))) {
    throw new Error('FASTIFRIED REQUIRED OPTION NOT PROVIDED. "distDirectory" is a required parameter');
  }

  if (![routes, routesDirectory].some(opt => Boolean(opt))) {
    throw new Error('FASTIFRIED REQUIRED OPTION NOT PROVIDED. Either "routes" or "routesDirectory" is required.');
  }

  const ROUTES = routes ? routes : await findRoutes(options);

  // Register each route with Fastify
  await ROUTES.forEach((route) => fastify.route(route));

  // Publish the route configuration
  await Publish({ ...options, routes: ROUTES });

  return fastify;
};


export { Publish };