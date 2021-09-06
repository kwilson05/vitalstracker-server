const { newUser, findUserByEmail } = require("../factory/UserFactory");
const { hashPassword } = require("../util/PasswordUtil");
const { newFirebaseUserToken } = require("../util/FirebaseUtil");



module.exports.register = async (req, res) => {

  const { email, password, firstName, lastName } = req.body;

  try {

    if ((await findUserByEmail(email))) {
      res.status(400).send({ error: 'An user with this email address already exists' });
      return;
    }

    //create new user in db
    const newUserDbo = await newUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await hashPassword(password)
    });

    const firebaseUserToken = await newFirebaseUserToken({
      email: newUserDbo.email,
      password: newUserDbo.password,
      userID: newUserDbo.id.toString()
    });


    /*
      redirect using http status code 307 for a temporary redirect
      to keep the same request method (POST)
     */
    res.redirect(307, `session/${firebaseUserToken}`);
  }
  catch (err) {

    res.status(500).send({ error: "Could not register user" });
  }
}


