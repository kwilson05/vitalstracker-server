const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { getWaterIntake } = require('../factory/WaterIntakeFactory');
const { getBloodPressure } = require('../factory/BloodPressureFactory');

class VitalDbo {
  #id;
  #notes;
  #pulse;
  #userId;
  #waterIntakeId;
  #bloodPressureId;
  #bodyTemperature;
  #createdAt;

  constructor({ id, notes, pulse, userId, bloodPressureId, bodyTemperature, waterIntakeId, createdAt }) {
    this.#id = id;
    this.#notes = notes;
    this.#pulse = pulse;
    this.#userId = userId;
    this.#bloodPressureId = bloodPressureId;
    this.#bodyTemperature = bodyTemperature;
    this.#waterIntakeId = waterIntakeId;
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

  get bloodPressureId() {
    return this.#bloodPressureId;
  }

  get bodyTemperature() {
    return this.#bodyTemperature;
  }

  get waterIntakeId() {
    return this.#waterIntakeId;
  }

  get createdAt() {
    return this.#createdAt;
  }

  async json() {
    const bloodPressureDbo = await getBloodPressure(this.#bloodPressureId);
    const waterIntakeDbo = await getWaterIntake(this.#waterIntakeId);

    return {
      id: this.#id,
      notes: this.#notes,
      createdAt: this.#createdAt.toISOString().slice(0, -1),
      pulse: this.#pulse,
      bodyTemperature: this.#bodyTemperature,
      waterIntake: waterIntakeDbo.json(),
      bloodPressure: bloodPressureDbo.json()
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
