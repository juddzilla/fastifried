import DB from '../../store.js';

const handler = async (req, res) => {
  const show = await DB.Shows.Update(req.data);
  return res.send(show);
};

export const route = {
  handler,
  method: 'PUT',
  path: '/shows/:name',
};