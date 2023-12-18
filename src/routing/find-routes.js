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

export default async (directory) => {
  const filepaths = findFiles(directory);

  try {
    const routes = await Promise.all(filepaths.map(async (filepath) => {
      const { route } = await import(filepath);
      if (!route) {
        return null;
      }

      const relative = path.relative(directory, filepath);
      const parts = relative.split('/');
      parts[parts.length - 1] = path.parse(parts[parts.length - 1]).name;

      const name = parts
        .map(part =>
            part.replace(
                /(\w)(\w*)/g,
                (g0,g1,g2) => { return g1.toUpperCase() + g2.toLowerCase(); }
            )
            .replace(/-/g, ''))
        .join('');

      return { ...route, name };
    }));

    return routes.filter(Boolean);
  } catch (err) {
    throw Error(err);
  }
}