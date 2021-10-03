const { newUser, findUserByEmail, getAllUsers } = require("../factory/UserFactory");
const { hashPassword, comparePlainWithHashed } = require("../util/PasswordUtil");
const { newFirebaseUserToken, decodeClaims, firebaseSignin } = require("../util/FirebaseUtil");




module.exports.all = async (req, res) => {
  try {
    const userDbos = await getAllUsers();

    const usersJson = [];

    for (let userDbo of userDbos) {
      usersJson.push(userDbo.json());
    }

    res.status(200).send(usersJson);
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not retrieve all users' });
  }
}
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

    const firebaseToken = await firebaseSignin({
      email: userDbo.email,
      password: userDbo.password,
    });

    /*
      redirect using http status code 307 for a temporary redirect
      to keep the same request method (POST)
     */
    res.redirect(307, `/session/${firebaseToken}`);
  }
  catch (err) {

    res.status(500).send({ error: "Could not signin user" });
  }
}

module.exports.signout = (req, res) => {



  /*
     redirect using http status code 307 for a temporary redirect
     to keep the same request method (POST)
    */
  res.redirect(307, `/session/signout`);
}

module.exports.isSignedIn = async (req, res) => {

  try {
    const userClaims = await decodeClaims(req.cookies.session);
    let isUserSignedIn = !!userClaims.userID;
    res.status(200).send({ isUserSignedIn: isUserSignedIn });
  }
  catch (err) {
    res.status(200).send({ isUserSignedIn: false })
  }

}




