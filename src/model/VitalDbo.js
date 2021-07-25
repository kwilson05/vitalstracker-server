const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class VitalDbo {
  #id;
  #notes;
  #pulse;
  #userId;
  #waterIntake;
  #bloodPressure;
  #bodyTemperature;
  #createdAt;

  constructor({ id, notes, pulse, userId, bloodPressure, bodyTemperature, waterIntake, createdAt }) {
    this.#id = id;
    this.#notes = notes;
    this.#pulse = pulse;
    this.#userId = userId;
    this.#bloodPressure = bloodPressure;
    this.#bodyTemperature = bodyTemperature;
    this.#waterIntake = waterIntake;
    this.#createdAt = createdAt;
  }

  get id() {
    return this.#id;
  }

  get notes() {
    return this.#notes;
  }

  get pulse() {
    return this.#pulse;
  }

  get userId() {
    return this.#userId;
  }

  get bloodPressure() {
    return this.#bloodPressure;
  }

  get bodyTemperature() {
    return this.#bodyTemperature;
  }

  get waterIntake() {
    return this.#waterIntake;
  }

  get createdAt() {
    return this.#createdAt;
  }

  json() {


    return {
      id: this.#id,
      notes: this.#notes,
      createdAt: this.#createdAt.toISOString().slice(0, -1),
      pulse: this.#pulse,
      bodyTemperature: this.#bodyTemperature,
      waterIntake: this.#waterIntake.json(),
      bloodPressure: this.#bloodPressure.json()
    }
  }

  save() {
    //need to update waterintake and bloodPressureId then vital
    return prisma.vital.update({
      where: {
        id: this.#id,
      },
      data: {
        pulse: this.#pulse,
        bodyTemperature: this.#bodyTemperature,
        notes: this.#notes,
      }
    });
  }
  delete() {
    //not sure if prisma handles cascase deletes
    return prisma.vital.delete({
      where: {
        id: this.#id,
      }
    })
  }
}


module.exports = VitalDbo;
