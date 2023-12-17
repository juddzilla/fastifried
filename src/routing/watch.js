import chokidar from 'chokidar';
import buildPublicFile from './publish.js';

export default function(options) {
  const watcher = chokidar.watch(options.directory);
  watcher
      .on('add', buildPublicFile.bind(null, options))
      .on('change', buildPublicFile.bind(null, options))
      .on('unlink',buildPublicFile.bind(null, options));
}