const { newUser } = require("../factory/UserFactory");

module.exports.new = async (req, res) => {
  try {
    const user = req.body;
    const userDbo = await newUser(user);
    res.status(200).send(userDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not create new user' });
  }
}
