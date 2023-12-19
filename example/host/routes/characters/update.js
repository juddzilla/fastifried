import DB from '../../store.js';

const handler = async (req, res) => {
  const character = await DB.Characters.Update(req.data);
  return res.send(character );
};

export default {
  handler,
  method: 'PUT',
  path: '/characters/:name',
};
