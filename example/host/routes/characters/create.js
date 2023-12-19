import Store from '../../store.js';

const handler = async (req, res) => {
  const character = await Store.Characters.Create(req.data);
  return res.send(character);
};

export default {
  handler,
  method: 'POST',
  path: '/characters/',
};