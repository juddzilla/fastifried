export default async (options) => {
  const {
    filepaths,
    preHandlers,
    preValidation,
  } = options;

  try {
    const routes = await Promise.all(filepaths.map(async (handler) => {
      const { route } = await import(handler);

      if (route) {
        if (preValidation) {
          if (!Object.hasOwn(route, 'public')) {
            route.preValidation = preValidation;
          } else {
            delete route.public;
          }
        }

        const Route = { ...route };

        if (preHandlers) {
          Route.preHandler = preHandlers[route.method.toUpperCase()]
        }

        return Route;
      }

      return null;
    }));

    return routes.filter(Boolean);
  } catch (err) {
    console.warn(err);
  }
};
