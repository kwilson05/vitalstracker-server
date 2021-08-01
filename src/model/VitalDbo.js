const { PrismaClient } = require('@prisma/client');
const { getWaterMeasurement } = require('../factory/WaterMeasurementFactory');
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

  set id(id) {
    this.#id = id;
  }

  get notes() {
    return this.#notes;
  }

  set notes(notes) {
    this.#notes = notes;
  }


  get pulse() {
    return this.#pulse;
  }

  set pulse(pulse) {
    this.#pulse = pulse;
  }

  get userId() {
    return this.#userId;
  }

  set userId(userId) {
    this.#userId = userId;
  }

  get bloodPressure() {
    return this.#bloodPressure;
  }

  set bloodPressure({ systolic, diastolic }) {
    this.#bloodPressure.systolic = systolic;
    this.#bloodPressure.diastolic = diastolic;
  }

  get bodyTemperature() {
    return this.#bodyTemperature;
  }

  set bodyTemperature(bodyTemperature) {
    this.#bodyTemperature = bodyTemperature;
  }

  get waterIntake() {
    return this.#waterIntake;
  }

  set waterIntake({ measurement, intake }) {
    this.#waterIntake.measurement = measurement;
    this.#waterIntake.intake = intake;
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

  async save() {

    this.#waterIntake.save();
    this.#bloodPressure.save();

    return prisma.vital.update({
      where: {
        id: this.#id,
      },
      data: {
        pulse: this.#pulse,
        bodyTemperature: this.#bodyTemperature,
        notes: this.#notes,
        waterIntake: {
          update: {
            measurement: getWaterMeasurement(this.#waterIntake.measurement),
            intake: this.#waterIntake.intake
          }
        },
        bloodPressure: {
          update: {
            systolic: this.#bloodPressure.systolic,
            diastolic: this.#bloodPressure.diastolic
          }
        }
      },
      include: {
        bloodPressure: true,
        waterIntake: true
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
