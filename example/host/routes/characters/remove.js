import Store from '../../store.js';

const handler = async (req, res) => {
  const character = await Store.Characters.Remove(req.data);
  return res.send(character);
};

export const route = {
  handler,
  method: 'DELETE',
  path: '/characters/:name',
};