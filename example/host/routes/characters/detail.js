import Store from '../../store.js';

const handler = async (req, res) => {
  const character = await Store.Characters.Find(req.data);
  return res.send(character);
};

export const route = {
  handler,
  method: 'GET',
  path: '/characters/:name',
  unprotected: true,
};
