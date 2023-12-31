import DB from '../../store.js';

const handler = async (req, res) => {
  const characters = await DB.Characters.List();
  return res.send(characters);
};

export const route = {
  handler,
  method: 'GET',
  path: '/characters/',
  unprotected: true,
};