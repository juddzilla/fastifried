import path from 'path';
import fs from 'fs';

import Publish from '../routing/publish';

const processArgs = process.argv.slice(2);

function noConfig() {
  throw Error('FASTIFRIED BUILD ERROR - NO CONFIG FILE FOUND. The argument "config", with a value of the relative path from where the command was called, was not found or valid.  Please see documentation at');
}

if (processArgs && processArgs.length) {
  const args = processArgs.reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {})

  if (Object.hasOwn(args, 'config')) {
    const configPath = path.resolve(process.cwd(), args.config);

    if (!fs.existsSync(configPath)) {
      noConfig();
    }

    const configFile = await import(configPath);
    const config = configFile.default;

    await Publish(config);
  } else {
    noConfig();
  }
} else {
  noConfig();
}