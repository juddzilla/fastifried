/* eslint-disable func-names */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { writeFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientFrom = path.resolve(__dirname, 'fetch.js');

export default async function(routes, options) {
  const {
    consumableDirectory,
    consumableFileName,
  } = options;

  const consumable = consumableFileName || 'fastifry.js';

  const publicConsumable = path.resolve(consumableDirectory, consumable);
  const publicPathsFile = path.join(consumableDirectory, 'paths.json');
  if (!fs.existsSync(publicPathsFile)) {
    fs.mkdirSync(consumableDirectory, { recursive: true });
    try {
      await writeFile(publicPathsFile, JSON.stringify({}));
    } catch (err) {
      console.error(err);
    }
  }

  const paths = routes.reduce((acc, value) => {
    const { method, name } = value;
    acc[name] = { method, path: value.path };
    return acc;
  }, {});

  fs.copyFileSync(clientFrom, publicConsumable);
  return fs.writeFile(publicPathsFile, JSON.stringify(paths, null, 2), (err) => {
    if (err) {
      console.warn('write paths err', err);
      throw err;
    }
  });
}
