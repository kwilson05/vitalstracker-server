const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const BloodPressureDbo = require('../model/BloodPressureDbo');

module.exports.newBloodPressure = async function ({ diastolic, systolic }) {

  const bloodPressure = await prisma.waterIntake.create({
    systolic: systolic,
    diastolic: diastolic
  });

  return new BloodPressureDbo({
    id: bloodPressure.id,
    systolic: bloodPressure.systolic,
    diastolic: bloodPressure.diastolic,
  });
};
