const admin = require("firebase-admin");
const { newUser, findUserByEmail } = require("../factory/UserFactory");
const { hashPassword } = require("../util/PasswordUtil");

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
    })

    const firebaseUser = await admin
      .auth()
      .createUser({
        uid: `${newUserDbo.id}`,
        email: email,
        emailVerified: false,
        password: hashedPassword,
        displayName: `${firstName} ${lastName}`,
        disabled: false,
      });* /



    //need to create a cookie
    //might create new route for that
    res.status(200).send({});
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: "Could not register user" });
  }
}
