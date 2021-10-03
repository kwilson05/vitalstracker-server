const { newFirebaseSessionCookie } = require("../util/FirebaseUtil");
const { cookieOptions, cookieFiveDayMaxAge } = require("../util/SessionCookieUtil");

module.exports.signin = async (req, res) => {

  try {
    const { firebaseToken } = req.params;

    const sessionCookiePayload = await newFirebaseSessionCookie(firebaseToken);


    res.cookie('session', sessionCookiePayload, cookieOptions({
      maxAge: cookieFiveDayMaxAge(),
      isSecure: false,
      isHttpOnly: true
    }));

    res.status(200).send({});
  }
  catch (err) {
    res.status(500).send({ error: "Could not signin user" });
  }
}

module.exports.signout = async (req, res) => {


  const sessionCookiePayload = req.cookies.session;
  res.clearCookie('session');
  const claims = await admin
    .auth()
    .verifySessionCookie(sessionCookiePayload);


  admin.auth().revokeRefreshTokens(claims.sub);

  res.status(200).send({});

}
