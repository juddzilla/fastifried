/* eslint-disable func-names */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import findRoutes from './find-routes';

/**
 * Asynchronously generates and writes a file that defines routes and fetch functionality.
 *
 * @param {Object} options - The options object.
 * @param {string} options.distDirectory - The directory where the output files will be stored.
 * @param {string} options.distFileName - The name of the output JavaScript file.
 * @param {Array<Object>|undefined} options.routes - An array of route objects or undefined to discover routes dynamically.
 * @param {string} options.routesDirectory - The directory where route files are located if routes are not provided.
 * @returns {Promise<void>} A promise that resolves when the files are generated and written successfully.
 * @throws {Error} Throws an error if there is an issue with file operations or route discovery.
 */
export default async function(options) {
  const {
    distDirectory,
    distFileName,
    routes,
  } = options;

  // Determine the directory of the current module file
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Resolve the path to the fetch template
  const fetchTemplate = path.resolve(__dirname, 'fetch.js');
  const pathsFileName = 'paths.json';
  // If routes are not provided, discover them dynamically
  const ROUTES = routes ? routes : await findRoutes(options);

  // Ensure the output file has a .js extension
  let fileName = distFileName || 'fastifried.js';
  if (path.extname(fileName) !== '.js') {
    fileName = fileName += '.js';
  }

  // Resolve paths for the output files
  const publicFetch = path.resolve(distDirectory, fileName);
  const publicPathsFile = path.join(distDirectory, pathsFileName);

  // Create paths.json if it doesn't exist
  if (!fs.existsSync(publicPathsFile)) {
    fs.mkdirSync(distDirectory, { recursive: true });
    try {
      await writeFile(publicPathsFile, JSON.stringify({}));
    } catch (err) {
      console.error(err);
    }
  }

  // Generate paths object from route data
  const paths = ROUTES.reduce((acc, value) => {
    const { method, name } = value;
    acc[name] = { method, path: value.path };
    return acc;
  }, {});

  // Copy fetch template to the output file
  fs.copyFileSync(fetchTemplate, publicFetch);

  // Write the paths object to paths.json
  return fs.writeFile(publicPathsFile, JSON.stringify(paths, null, 2), (err) => {
    if (err) {
      throw new Error(err);
    }
  });
}
