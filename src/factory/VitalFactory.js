const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const VitalDbo = require('../model/VitalDbo');
const { newWaterIntake } = require('./WaterIntakeFactory');
const { newBloodPressure } = require('./BloodPressureFactory');

module.exports.newVital = async function ({ notes, pulse, bloodPressure, waterIntake, bodyTemperature }) {

  const bloodPressureDbo = await newBloodPressure({
    diastolic: bloodPressure.diastolic,
    systolic: bloodPressure.systolic
  });

  const waterIntakeDbo = await newWaterIntake({
    measurement: waterIntake.measurement,
    intake: waterIntake.intake
  });


  const vital = await prisma.vital.create({
    data: {
      notes: notes,
      pulse: pulse,
      bodyTemperature: bodyTemperature,
      userId: 1,
      waterIntakeId: waterIntakeDbo.id,
      bloodPressureId: bloodPressureDbo.id
    }
  });

  return newDbo({
    id: vital.id,
    notes: vital.notes,
    pulse: vital.pulse,
    bodyTemperature: vital.bodyTemperature,
    userId: 1,
    waterIntakeId: vital.waterIntakeId,
    bloodPressureId: vital.bloodPressureId,
    createdAt: vital.createdAt
  });
};

const newDbo = ({ id, notes, pulse, bodyTemperature, userId, waterIntakeId, bloodPressureId, createdAt }) => {
  return new VitalDbo({
    id: id,
    notes: notes,
    pulse: pulse,
    bodyTemperature: bodyTemperature,
    userId: userId,
    waterIntakeId: waterIntakeId,
    bloodPressureId: bloodPressureId,
    createdAt: createdAt
  });
}
