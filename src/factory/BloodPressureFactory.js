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

  const bloodPressure = await prisma.bloodPressure.findUnique({
    where: {
      id: bloodPressureId
    }
  });

  return newDbo(bloodPressure);
}

module.exports.bloodPressureDbo = ({ id, systolic, diastolic }) => {
  return newDbo({ id: id, systolic: systolic, diastolic: diastolic });
}


const newDbo = ({ id, systolic, diastolic }) => {
  return new BloodPressureDbo({ id: id, systolic: systolic, diastolic: diastolic });
}
