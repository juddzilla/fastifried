import { glob } from 'glob';
import path from 'path';

export default (directory) => {
  try {
    return glob.sync(path.join(directory, '*.js'));
  } catch (err) {
    console.warn('Find Files Error');
    console.warn(err);
    return `Find files error: ${err}`;
  }
};