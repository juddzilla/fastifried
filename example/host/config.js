import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import EnvVars from './env.js';
import preHandlers from './routing/preHandlers/index.js';
import preValidation from './routing/preValidations/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.join(path.dirname(__dirname),  'host');
const watchDirectory = path.join(rootDirectory, 'routes', '**');
const consumableDirectory = path.join(rootDirectory, EnvVars.consumableDirectory);

export default {
  consumableDirectory,
  consumableFileName: EnvVars.consumableName,
  preHandlers,
  preValidation,
  watchDirectory,
}