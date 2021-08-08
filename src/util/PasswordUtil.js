const { hash, genSalt } = require('bcryptjs');
const config = require('../../config/config');
module.exports.hashPassword = async (password) => {
  const salt = await genSalt(config.pwd_cost_factor);
  return hash(password, salt);

}
