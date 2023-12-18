import DB from '../store.js';

const handler = async (req, res) => {
  const character = await DB.Characters.Update(req.data);
  return res.send(character );
};

export const route = {
  handler,
  method: 'PUT',
  name: 'UpdateCharacter',
  path: '/characters/:name',
};

export default handler;
