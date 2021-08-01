const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const WaterIntakeDbo = require('../model/WaterIntakeDbo');
const { getWaterMeasurement, getWaterMeasurementString } = require("../factory/WaterMeasurementFactory");

module.exports.newWaterIntake = async ({ measurement, intake }) => {


  const waterIntake = await prisma.waterIntake.create({
    data: {
      measurement: getWaterMeasurement(measurement),
      intake: intake
    }
  });

  return newDbo(waterIntake);
};

module.exports.findWaterIntake = async (waterIntakeId) => {

  const waterIntake = await prisma.waterIntake.findUnique({
    where: {
      id: waterIntakeId
    }
  });

  return newDbo(waterIntake);
}

module.exports.createWaterIntakeDbo = ({ id, measurement, intake }) => {
  return newDbo({ id: id, measurement: getWaterMeasurementString(measurement), intake: intake });
}

const newDbo = ({ id, measurement, intake }) => {
  return new WaterIntakeDbo({ id: id, measurement: getWaterMeasurementString(measurement), intake: intake });
}


