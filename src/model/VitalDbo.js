const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { getWaterIntake } = require('../factory/WaterIntakeFactory');
const { getBloodPressure } = require('../factory/BloodPressureFactory');

class VitalDbo {
  #id;
  #pulse;
  #userId;
  #waterIntakeId;
  #bloodPressureId;
  #bodyTemperature;
  #createDate;

  //include waterIntakeJson and bloodPressureJson
  //then they'll only need to be set sometimes.
  constructor({ id, pulse, userId, bloodPressureId, bodyTemperature, waterIntakeId, createDate }) {
    this.#id = id;
    this.#pulse = pulse;
    this.#userId = userId;
    this.#bloodPressureId = bloodPressureId;
    this.#bodyTemperature = bodyTemperature;
    this.#waterIntakeId = waterIntakeId;
    this.#createDate = createDate;
  }

  get id() {
    return this.#id;
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

  get createDate() {
    return this.#createDate;
  }

  async json() {

    //If waterIntake or bloodPressure isn't set then we need to hit the db to get them
    const bloodPressureDbo = await getBloodPressure(this.#bloodPressureId);
    const waterIntakeDbo = await getWaterIntake(this.#waterIntakeId);

    return {
      id: this.#id,
      createDate: this.#createDate.toISOString().slice(0, -1),
      pulse: this.#pulse,
      bodyTemperature: this.#bodyTemperature,
      waterIntake: waterIntakeDbo.json,
      bloodPressure: bloodPressureDbo.json
    }
  }

  save() {
    //need to update waterintake and bloodPressureId then vital
    return prisma.vital.update({
      where: {
        id: this.#id,
      },
      data: {
        title: this.#title,
        description: this.#description,
        photoTakenDate: this.#photoTakenDate,
      }
    });
  }
  delete() {
    //not sure if prisma handles cascase deletes
    return prisma.imagefile.delete({
      where: {
        id: this.#id,
      }
    })
  }
}


module.exports = VitalDbo;
