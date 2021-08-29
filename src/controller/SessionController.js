const admin = require("firebase-admin");

module.exports.signin = async (req, res) => {

  try {
    const { firebaseToken } = req.params;

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(firebaseToken, { expiresIn });
    // Set cookie policy for session cookie.
    const options = { maxAge: expiresIn, httpOnly: true, secure: false };
    res.cookie('session', sessionCookie, options);

    res.status(200).send({});
  }
  catch (err) {
    res.status(500).send({ error: "Could not signin user" });
  }
}

module.exports.signout = async (req, res) => {


  const sessionCookie = req.cookies.session;
  res.clearCookie('session');
  const claims = await admin
    .auth()
    .verifySessionCookie(sessionCookie);


  admin.auth().revokeRefreshTokens(claims.sub);

  res.status(200).send({});

}
