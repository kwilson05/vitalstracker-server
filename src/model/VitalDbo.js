const { PrismaClient } = require('@prisma/client');
const { getWaterMeasurement } = require('../factory/WaterMeasurementFactory');
const prisma = new PrismaClient();

class VitalDbo {
  #id;
  #notes;
  #pulse;
  #userId;
  #waterIntakeDbo;
  #bloodPressureDbo;
  #bodyTemperature;
  #createdAt;

  constructor({ id, notes, pulse, userId, bloodPressureDbo, bodyTemperature, waterIntakeDbo, createdAt }) {
    this.#id = id;
    this.#notes = notes;
    this.#pulse = pulse;
    this.#userId = userId;
    this.#bloodPressureDbo = bloodPressureDbo;
    this.#bodyTemperature = bodyTemperature;
    this.#waterIntakeDbo = waterIntakeDbo;
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

  get bloodPressureDbo() {
    return this.#bloodPressureDbo;
  }

  set bloodPressureDbo({ systolic, diastolic }) {
    this.#bloodPressureDbo.systolic = systolic;
    this.#bloodPressureDbo.diastolic = diastolic;
  }

  get bodyTemperature() {
    return this.#bodyTemperature;
  }

  set bodyTemperature(bodyTemperature) {
    this.#bodyTemperature = bodyTemperature;
  }

  get waterIntakeDbo() {
    return this.#waterIntakeDbo;
  }

  set waterIntakeDbo({ measurement, intake }) {
    this.#waterIntakeDbo.measurement = measurement;
    this.#waterIntakeDbo.intake = intake;
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
      waterIntake: this.#waterIntakeDbo.json(),
      bloodPressure: this.#bloodPressureDbo.json()
    }
  }

  async save() {
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
            measurement: getWaterMeasurement(this.#waterIntakeDbo.measurement),
            intake: this.#waterIntakeDbo.intake
          }
        },
        bloodPressure: {
          update: {
            systolic: this.#bloodPressureDbo.systolic,
            diastolic: this.#bloodPressureDbo.diastolic
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

    return prisma.vital.delete({
      where: {
        id: this.#id,
      },
    })
  }
}


module.exports = VitalDbo;
