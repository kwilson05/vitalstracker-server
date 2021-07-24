const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserDbo {
  #id;
  #password;
  #email;
  #firstName;
  #lastName;

  constructor({ id, password, email, firstName, lastName }) {
    this.#id = id;
    this.#password = password;
    this.#email = email;
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get id() {
    return this.#id;
  }

  get password() {
    return this.#password;
  }

  get email() {
    return this.#email;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  json() {
    return {
      id: this.#id,
      password: this.#password,
      email: this.#email,
      firstName: this.#firstName,
      lastName: this.#lastName
    }
  }

  save() {
    return prisma.user.update({
      where: {
        id: this.#id,
      },
      data: {
        firstName: this.#firstName,
        lastName: this.#lastName,
        email: this.#email
      }
    });
  }
  delete() {
    return prisma.bloodPressure.delete({
      where: {
        id: this.#id,
      }
    })
  }
}


module.exports = UserDbo;
