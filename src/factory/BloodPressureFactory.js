const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const BloodPressureDbo = require('../model/BloodPressureDbo');

module.exports.newBloodPressure = async function ({ diastolic, systolic }) {

  const bloodPressure = await prisma.bloodPressure.create({
    data: {
      systolic: systolic,
      diastolic: diastolic
    }
  });

  return newDbo(bloodPressure);
};

module.exports.getBloodPressure = async (bloodPressureId) => {

  const bloodPressure = prisma.bloodPressure.findUnique({
    where: {
      id: bloodPressureId
    }
  });

  return newDbo(bloodPressure);
}

const newDbo = ({ id, systolic, diastolic }) => {
  return new BloodPressureDbo({ id: id, systolic: systolic, diastolic: diastolic });
}
