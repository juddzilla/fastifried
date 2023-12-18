import DB from '../store.js';

const handler = async (req, res) => {
  const characters = await DB.Characters.List();
  return res.send(characters);
};

export const route = {
  handler,
  method: 'GET',
  name: 'Characters',
  path: '/characters/',
  unprotected: true,
};

export default handler;
