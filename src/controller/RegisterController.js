const firebase = require("firebase")
const { newUser, findUserByEmail } = require("../factory/UserFactory");
const { hashPassword } = require("../util/PasswordUtil");
const { nextTick } = require("vue");


module.exports.register = async (req, res) => {

  const { email, password, firstName, lastName } = req.body;

  try {

    const userDbo = await findUserByEmail(email);
    if (userDbo) {
      res.status(400).send({ error: 'An user with this email address already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    //create new user in db
    const newUserDbo = await newUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    });


    const firebaseUser = await firebase.auth().createUserWithEmailAndPassword(email, hashedPassword);


    const firebaseToken = await firebaseUser.user.getIdToken();

    /*
      redirect using http status code 307 for a temporary redirect
      to keep the same request method (POST)
     */
    res.redirect(307, `/session/${firebaseToken}`);
  }
  catch (err) {

    res.status(500).send({ error: "Could not register user" });
  }
}


