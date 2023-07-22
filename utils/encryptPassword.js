const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

const comparePassword = async (comparePassword, userPassword) => {
  return await bcrypt.compare(comparePassword, userPassword);
};

module.exports = { encryptPassword, comparePassword };
