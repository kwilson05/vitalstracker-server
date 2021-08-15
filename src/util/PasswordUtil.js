const { hash, genSalt, compare } = require('bcryptjs');
const config = require('../../config/config');
module.exports.hashPassword = async (password) => {
  const salt = await genSalt(config.pwd_cost_factor);
  return hash(password, salt);

}

module.exports.comparePlainWithHashed = ({ hashedPassword, plainPassword }) => {
  return compare(plainPassword, hashedPassword);
}
