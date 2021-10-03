const firebase = require("firebase").default;
const firebase_admin = require("firebase-admin");
const { cookieFiveDayMaxAge, cookieOptions } = require("../util/SessionCookieUtil");


module.exports.decodeClaims = async (cookie) => {

  if (!cookie) {
    return {}
  }

  const decodedClaims = await firebase_admin
    .auth()
    .verifySessionCookie(cookie, true);

  return { email: decodedClaims.email, userID: decodedClaims.uid };
}

module.exports.firebaseSignin = async ({ email, password }) => {
  const firebaseUserCredentail = await firebase.auth().signInWithEmailAndPassword(
    email,
    password
  );

  return await firebaseUserCredentail.user.getIdToken();
}
module.exports.newFirebaseUserToken = async ({ email, password, userID }) => {

  const firebaseUser = await firebase_admin.auth().createUser(
    {
      email: email,
      password: password,
      uid: userID
    }
  );


  const firebaseUserCredentail = await firebase.auth().signInWithEmailAndPassword(
    email,
    password
  );

  return await firebaseUserCredentail.user.getIdToken();
}

module.exports.newFirebaseSessionCookie = async (sessionToken) => {

  const maxAge = cookieFiveDayMaxAge();
  const sessionCookie = await firebase_admin
    .auth()
    .createSessionCookie(sessionToken, { expiresIn: maxAge });

  return sessionCookie;

}

