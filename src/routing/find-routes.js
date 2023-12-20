import { glob } from 'glob';
import path from 'path';

export const findFiles = (directory) => {
  try {
    return glob.sync(path.join(directory, '**', '*.js'));
  } catch (err) {
    console.warn('Find Files Error');
    console.warn(err);
    return `Find files error: ${err}`;
  }
};

/**
 * Asynchronously loads route objects from files in a directory and processes them.
 *
 * @param {string} routesDirectory - The directory path containing route files.
 * @param {boolean} useNamedExport - If true, Fastifried will use the name export 'route' in the files from options.routesDirectory
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of processed route objects.
 * @throws {Error} Throws an error if there is an issue loading or processing route files.
 */
export default async ({ routesDirectory, useNamedExport }) => {
  // Find file paths in the specified directory
  const filepaths = findFiles(routesDirectory);

  try {
    // Use Promise.all to asynchronously load and process route files
    const routes = await Promise.all(filepaths.map(async (filepath) => {
      // Import the route file dynamically
      const routeFile = await import(filepath);

      // Determine the route object, considering 'route' or 'default' property
      const route = useNamedExport ? routeFile.route : routeFile.default;

      // If no route object is found, skip to the next iteration
      if (!route) {
        return null;
      }

      let name = route.name;

      // Extract the route name, either from the 'name' property or by processing the file path
      if (!name) {
        // Process the file path to generate a camelCase name
        const relative = path.relative(routesDirectory, filepath);
        const parts = relative.split('/');

        parts[parts.length - 1] = path.parse(parts[parts.length - 1]).name;

        name = parts
            .map(part =>
                part
                    .replace(
                        /(\w)(\w*)/g,
                        (g0, g1, g2) => { return g1.toUpperCase() + g2.toLowerCase(); }
                    )
                    .replace(/-/g, '')
            ).join('');
      }

      // Return a new object combining the route and the processed name
      return { ...route, name };
    }));

    // Filter out null routes and return the processed array
    const filtered = routes.filter(Boolean);
    console.log('# of Routes found:', filtered.length);

    // return the processed array
    return filtered;
  } catch (err) {
    // Throw an error if there is an issue loading or processing route files
    throw new Error(err);
  }
};
