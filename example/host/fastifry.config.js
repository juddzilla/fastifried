import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import findRoutes from '../../src/routing/find-routes';

import EnvVars from './env';
import preHandlers from './routing/preHandlers';
import preValidation from './routing/preValidations/auth';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.join(path.dirname(__dirname),  'host');
const watchDirectory = path.join(rootDirectory, 'routes');
const distDirectory = path.join(rootDirectory, EnvVars.distDirectory);

const originalRoutes = await findRoutes(watchDirectory);

const routes = originalRoutes.map(oRoute => {
  const { unprotected, ...rest } = oRoute;
  const route = rest;
  console.log('routess', oRoute, route);
  if (!unprotected) {
    route.preValidation = preValidation;
  }

  route.preHandler = preHandlers[route.method.toUpperCase()]
  return route;
});

export default {
  distDirectory,
  distFileName: EnvVars.distFileName,
  routes,
  routesDirectory: watchDirectory,
}