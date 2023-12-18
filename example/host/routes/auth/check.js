const handler = async (req, res) => res.status(200).send({ success: true });

export const route = {
  handler,
  method: 'GET',
  path: '/auth',
};
