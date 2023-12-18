import { glob } from 'glob';
import path from 'path';

export const findFiles = (directory) => {
  try {
    return glob.sync(path.join(directory, '*.js'));
  } catch (err) {
    console.warn('Find Files Error');
    console.warn(err);
    return `Find files error: ${err}`;
  }
};

export default async (directory) => {
  const filepaths = findFiles(directory);

  try {
    const routes = await Promise.all(filepaths.map(async (handler) => {
      const { route } = await import(handler);
      return route;
    }));

    return routes.filter(Boolean);
  } catch (err) {
    throw Error(err);
  }
}