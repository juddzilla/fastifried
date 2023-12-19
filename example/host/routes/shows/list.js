import DB from '../../store.js';

const handler = async (req, res) => {
  const shows = await DB.Shows.List();
  return res.send(shows);
};

export default {
  handler,
  method: 'GET',
  path: '/shows',
  unprotected: true,
};
