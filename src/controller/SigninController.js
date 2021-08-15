const firebase = require("firebase")
const { findUserByEmail } = require("../factory/UserFactory");
const { comparePlainWithHashed } = require("../util/PasswordUtil");



module.exports.signin = async (req, res) => {

  const { email, password } = req.body;

  try {


    const userDbo = await findUserByEmail(email);

    if (!userDbo) {
      res.status(401).send({ error: "User's email or password is invalid" });
      return;
    }

    const validPassword = await comparePlainWithHashed({
      hashedPassword: userDbo.password,
      plainPassword: password
    });


    if (!validPassword) {
      res.status(401).send({ error: "User's email or password is invalid" });
      return;
    }

    const firebaseUser = await firebase.auth().signInWithEmailAndPassword(email, userDbo.password);


    const firebaseToken = await firebaseUser.user.getIdToken();

    /*
      redirect using http status code 307 for a temporary redirect
      to keep the same request method (POST)
     */
    res.redirect(307, `/session/signin/${firebaseToken}`);
  }
  catch (err) {

    res.status(500).send({ error: "Could not signin user" });
  }
}


