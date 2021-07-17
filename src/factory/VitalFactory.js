const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const VitalDbo = require('../model/VitalDbo');
const { newWaterIntake } = require('./WaterIntakeFactory');
const { newBloodPressure } = require('./BloodPressureFactory');

module.exports.newVital = async function ({ notes, pulse, bloodPressure, waterIntake, bodyTemperature }) {

  const bloodPressure = await newBloodPressure({
    diastolic: bloodPressure.diastolic,
    systolic: bloodPressure.systolic
  });

  const waterIntake = await newWaterIntake({
    measurement: waterIntake.measurement,
    intake: waterIntake.intake
  });


  const vital = await prisma.vital.create({
    notes: notes,
    pulse: pulse,
    bodyTemperature: bodyTemperature,
    userId: 1,
    waterIntakeId: waterIntake.id,
    bloodPressureId: bloodPressure.id
  });

  return new VitalDbo({
    id: vital.id,
    pulse: vital.pulse,
    bodyTemperature: vital.bodyTemperature,
    userId: 1,
    waterIntakeId: vital.waterIntakeId,
    bloodPressureId: vital.bloodPressureId,
    createDate: vital.createDate
  });
};
