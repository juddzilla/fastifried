import EnvVars from '../../env';

const handler = (req, res) => {
  const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  res
      .setCookie(EnvVars.cookieName, `${expires}`, {
        domain: 'localhost',
        expires,
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: true,

      })
      .status(200)
      .send({ success: true });
}

export const route = {
  handler,
  method: 'GET',
  name: 'Login',
  path: '/login',
  unprotected: true,
};