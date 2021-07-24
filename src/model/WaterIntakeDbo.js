const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class WaterIntakeDbo {
  #id;
  #measurement;
  #intake;

  constructor({ id, measurement, intake }) {
    this.#id = id;
    this.#measurement = measurement;
    this.#intake = intake;
  }

  get id() {
    return this.#id;
  }

  get measurement() {
    return this.#measurement;
  }

  get intake() {
    return this.#intake;
  }

  json() {
    return {
      id: this.#id,
      intake: this.#intake,
      measurement: this.#measurement
    }
  }

  save() {
    return prisma.waterIntake.update({
      where: {
        id: this.#id,
      },
      data: {
        intake: this.#intake,
        measurement: this.#measurement,
      }
    });
  }
  delete() {
    return prisma.waterIntake.delete({
      where: {
        id: this.#id,
      }
    })
  }
}


module.exports = WaterIntakeDbo;
