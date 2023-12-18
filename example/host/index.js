import Fastify from 'fastify';
import cookies from '@fastify/cookie';
import cors from '@fastify/cors';

import Fastifried from '../../index.js';
import EnvVars from './env.js';

import config from './fastifry.config';

const {
  cookieSecret,
  environment,
  host,
  port,
} = EnvVars;

const fastify = Fastify({ logger: true });
fastify.register(cors, { origin: true, credentials: true });
fastify.register(cookies, { secret: cookieSecret, });

if (['dev', 'development' ].includes(environment)) {
  await Fastifried(fastify, config);
}

fastify.listen({
  port,
  host,
  listenTextResolver: (address) => { return `Fastifried Fastify server is listening at ${address}` },
}, (err) => {
  if (err) { throw Error(err) }
});
