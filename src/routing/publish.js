/* eslint-disable func-names */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import findRoutes from './find-routes';

export default async function(options) {
  const {
    distDirectory,
    distFileName,
    routes,
    routesDirectory,
  } = options;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fetchTemplate = path.resolve(__dirname, 'fetch.js');
  const pathsFileName = 'paths.json';
  const ROUTES = routes ? routes : await findRoutes(routesDirectory);

  let fileName = distFileName || 'fastifry.js';

  if (path.extname(fileName) !== '.js') {
    fileName = fileName += '.js';
  }

  const publicFetch = path.resolve(distDirectory, fileName);
  const publicPathsFile = path.join(distDirectory, pathsFileName);

  if (!fs.existsSync(publicPathsFile)) {
    fs.mkdirSync(distDirectory, { recursive: true });
    try {
      await writeFile(publicPathsFile, JSON.stringify({}));
    } catch (err) {
      console.error(err);
    }
  }

  const paths = ROUTES.reduce((acc, value) => {
    const { method, name } = value;
    acc[name] = { method, path: value.path };
    return acc;
  }, {});

  fs.copyFileSync(fetchTemplate, publicFetch);
  return fs.writeFile(publicPathsFile, JSON.stringify(paths, null, 2), (err) => {
    if (err) {
      throw Error(err);
    }
  });
}
