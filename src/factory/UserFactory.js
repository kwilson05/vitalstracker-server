const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const UserDbo = require('../model/UserDbo');

module.exports.newUser = async ({ firstName, lastName, email, password }) => {

  const user = await prisma.user.create({
    data: {
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    }
  });

  return newDbo(user);
};

const newDbo = ({ id, firstName, lastName, email, password }) => {
  return new UserDbo({ id: id, firstName: firstName, lastName: lastName, email: email, password: password });
}
