const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class BloodPressureDbo {
  #id;
  #systolic;
  #diastolic;

  constructor({ id, systolic, diastolic }) {
    this.#id = id;
    this.#systolic = systolic;
    this.#diastolic = diastolic;
  }

  get id() {
    return this.#id;
  }

  get systolic() {
    return this.#systolic;
  }

  set systolic(systolic) {
    this.#systolic = systolic;
  }

  get diastolic() {
    return this.#diastolic;
  }

  set diastolic(diastolic) {
    this.#diastolic = diastolic;
  }

  json() {
    return {
      id: this.#id,
      systolic: this.#systolic,
      diastolic: this.#diastolic
    }
  }

  save() {
    return prisma.bloodPressure.update({
      where: {
        id: this.#id,
      },
      data: {
        systolic: this.#systolic,
        diastolic: this.#diastolic,
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


module.exports = BloodPressureDbo;
