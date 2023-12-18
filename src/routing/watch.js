import chokidar from 'chokidar';
import buildPublicFile from './publish.js';

export default function(routes, options) {
  const watcher = chokidar.watch(options.watchDirectory);
  watcher
      .on('add', buildPublicFile.bind(null, routes, options))
      .on('change', buildPublicFile.bind(null, routes, options))
      .on('unlink',buildPublicFile.bind(null, routes, options));
}