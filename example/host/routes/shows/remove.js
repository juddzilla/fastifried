import Store from '../store.js';

const handler = async (req, res) => {
  const show = await Store.Shows.Remove(req.data);
  return res.send(show);
};

export const route = {
  handler,
  method: 'DELETE',
  path: '/shows/:name',
};