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
 * @returns {Promise<Object>} A promise that resolves to the configured Fastify instance.
 * @throws {Error} Throws an error if required options are not provided or if there is an issue with route configuration or publishing.
 */
export default async (fastify, options) => {
  const {
    distDirectory,
    distFileName,
    routes,
    routesDirectory,
  } = options;

  // Ensure required options are provided
  if (![distDirectory, distFileName, routesDirectory].every(opt => Boolean(opt))) {
    throw new Error('FASTIFRIED REQUIRED OPTION NOT PROVIDED. "distDirectory", "distFileName", "routesDirectory" are required parameters');
  }

  let ROUTES = [];

  // Check if routes are provided in the options
  if (routes) {
    // Ensure options.routes is an array
    if (!Array.isArray(routes)) {
      throw new Error('options.routes must be an array of Fastify routes. See https://fastify.dev/docs/latest/Reference/Routes/#routes-options');
    }

    ROUTES = routes;
  } else if (routesDirectory && typeof routesDirectory === 'string') {
    // Discover routes dynamically if routes are not provided
    ROUTES = await findRoutes(routesDirectory);
  }

  // Register each route with Fastify
  await ROUTES.forEach((route) => fastify.route(route));

  // Publish the route configuration
  await Publish(options);

  return fastify;
};


export { Publish };