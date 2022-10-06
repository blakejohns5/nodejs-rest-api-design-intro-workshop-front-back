const { auth } = require('../firebase/firebase')

async function authMiddleware(req, res, next) {
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
  ) {
    // auth token arrives as: Bearer <token>
    const bearerToken = req.headers.authorization.substr(7);

    try {
      const userClaims = await auth.verifyIdToken(bearerToken);

      const { email, uid } = userClaims;

      req.user = {
        email: email,
        uid: uid,
      };

      next();
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    })
  }
}

module.exports = { 
  authMiddleware: authMiddleware,
};