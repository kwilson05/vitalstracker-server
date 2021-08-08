const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const UserDbo = require('../model/UserDbo');


module.exports.getAllUsers = async () => {
  const users = await prisma.user.findMany();

  const userDbos = [];
  for (let user of users) {
    userDbos.push(newDbo(user));
  }

  return userDbos;
}

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

module.exports.findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });


  if (!user) {
    return null;
  }

  return newDbo(user);
}

const newDbo = ({ id, firstName, lastName, email, password }) => {
  return new UserDbo({ id: id, firstName: firstName, lastName: lastName, email: email, password: password });
}
