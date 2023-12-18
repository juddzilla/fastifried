import Publish from './routing/publish';
import findRoutes from './routing/find-routes';

export default async (fastify, options) => {
  const {
    distDirectory,
    distFileName,
    routes,
    routesDirectory,
  } = options;

  if (![distDirectory, distFileName, routesDirectory].every(opt => Boolean(opt))) {
    throw Error('FASTIFRIED REQUIRED OPTION NOT PROVIDED. "distDirectory", "distFileName", "routesDirectory" are required parameters', );
  }

  let ROUTES = [];

  if (routes) {
    if (!Array.isArray(routes)) {
      throw new Error('options.routes must be an array of Fastify routes. See https://fastify.dev/docs/latest/Reference/Routes/#routes-options');
    }

    ROUTES = routes;
  } else if (routesDirectory && typeof routesDirectory === 'string') {
    ROUTES = await findRoutes(routesDirectory);
  }

  await ROUTES.forEach((route) => fastify.route(route));
  await Publish(options);

  return fastify;
}

export { Publish };