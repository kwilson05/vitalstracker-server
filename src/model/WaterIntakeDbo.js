const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { getWaterMeasurement } = require("../factory/WaterMeasurementFactory");

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

  set measurement(measurement) {
    this.#measurement = measurement;
  }

  get intake() {
    return this.#intake;
  }

  set intake(intake) {
    this.#intake = intake;
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
        measurement: getWaterMeasurement(this.#measurement),
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
