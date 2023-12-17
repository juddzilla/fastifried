import EnvVars from '../../env.js';
const hasCookie = (cookies) => {
  if (!cookies) {
    return false;
  }

  return Object.hasOwn(cookies, EnvVars.cookieName);
}

const auth = async (req, res) => {
  try {
    const user = await hasCookie(req.cookies);

    if (!user) {
      return res.status(401).send({ success: false });
    }

    req.user = user;
  } catch (err) {
    console.warn('Auth Prehandler Error');
    console.warn(err);
  }
};

export default auth;
