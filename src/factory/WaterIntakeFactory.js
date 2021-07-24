const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const WaterIntakeDbo = require('../model/WaterIntakeDbo');
const { getWaterMeasurement } = require("../factory/WaterMeasurementFactory");

module.exports.newWaterIntake = async ({ measurement, intake }) => {


  const waterIntake = await prisma.waterIntake.create({
    data: {
      measurement: getWaterMeasurement(measurement),
      intake: intake
    }
  });

  return newDbo(waterIntake);
};

module.exports.getWaterIntake = async (waterIntakeId) => {

  const waterIntake = await prisma.waterIntake.findUnique({
    where: {
      id: waterIntakeId
    }
  });

  return newDbo(waterIntake);
}

const newDbo = ({ id, measurement, intake }) => {
  return new WaterIntakeDbo({ id: id, measurement: measurement, intake: intake });
}
