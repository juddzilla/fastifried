import DB from '../store.js';

const handler = async (req, res) => {
  const shows = await DB.Shows.List();
  return res.send(shows);
};

export const route = {
  handler,
  method: 'GET',
  name: 'Shows',
  path: '/shows',
  public: true,
};

export default handler;
