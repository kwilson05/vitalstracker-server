const { getAllUsers } = require("../factory/UserFactory");

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
