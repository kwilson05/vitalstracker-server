const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const WaterIntakeDbo = require('../model/WaterIntakeDbo');

module.exports.newWaterIntake = async function ({ measurement, intake }) {

  const waterIntake = await prisma.waterIntake.create({
    measurement: measurement,
    intake: intake
  });

  return new WaterIntakeDbo({
    id: waterIntake.id,
    measurement: waterIntake.measurement,
    intake: waterIntake.intake,
  });
};
