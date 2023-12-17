import Publish from './routing/publish';
import Routes from './routing/routes';
import Watcher from './routing/watch';
import findFiles from './routing/find-files';

export default async (fastify, options, watch) => {
  try {
    const filepaths = findFiles(options.watchDirectory);
    const routes = await Routes({ filepaths, ...options });
    await routes.forEach((config) => {
      if (config) {
        fastify.route(config);
      }
    });

    await Publish(routes, options);

    if (watch) {
      Watcher(options);
    }

    return fastify;
  } catch (err) {
    console.error(err);
  }
}

export { Publish };