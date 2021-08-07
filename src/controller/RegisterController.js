const firebase = require("firebase/app");
const admin = require("firebase");

module.exports.register = async (req, res) => {

  const { email, password, firstName, lastName } = req.body;

  const firebaseUser = await admin
    .auth()
    .getUserByEmail(email);

  if (firebaseUser) {
    res.status(400).send({ error: 'User with this email already exists' });
    return;
  }

  const newFirebaseUser = await admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    });

  console.log(newFirebaseUser);
  res.status(200).send({});
}
