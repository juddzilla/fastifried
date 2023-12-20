import EnvVars from '../../env';

export const route = {
  handler: (req, res) => {
    res
      .clearCookie(EnvVars.cookieName)
      .status(204)
      .send();
  },
  method: 'GET',
  path: '/logout',
  unprotected: true,
};