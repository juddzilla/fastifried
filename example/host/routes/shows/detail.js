import Store from '../store.js';

const handler = async (req, res) => {
  const show = await Store.Shows.Find(req.data);
  const characters = await Store.Characters.Show(req.data)
  return res.send({ characters, show });
};

export const route = {
  handler,
  method: 'GET',
  name: 'Show',
  path: '/shows/:name',
  unprotected: true,
};