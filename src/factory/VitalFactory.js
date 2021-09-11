const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const VitalDbo = require('../model/VitalDbo');
const { createWaterIntakeDbo } = require('./WaterIntakeFactory');
const { createBloodPressureDbo } = require('./BloodPressureFactory');
const { getWaterMeasurement } = require("../factory/WaterMeasurementFactory");

module.exports.newVital = async function ({ vital, userID }) {

  const { notes, pulse, bloodPressure, waterIntake, bodyTemperature } = vital;

  const newVital = await prisma.vital.create({
    data: {
      notes: notes,
      pulse: pulse,
      bodyTemperature: bodyTemperature,
      userId: userID,
      waterIntake: {
        create: {
          measurement: getWaterMeasurement(waterIntake.measurement),
          intake: waterIntake.intake
        }
      },
      bloodPressure: {
        create: {
          diastolic: bloodPressure.diastolic,
          systolic: bloodPressure.systolic
        }
      }
    },
    include: {
      bloodPressure: true,
      waterIntake: true
    }
  });


  const bloodPressureDbo = createBloodPressureDbo(newVital.bloodPressure);

  const waterIntakeDbo = createWaterIntakeDbo(newVital.waterIntake);


  return newDbo({
    id: newVital.id,
    notes: newVital.notes,
    pulse: newVital.pulse,
    bodyTemperature: newVital.bodyTemperature,
    userId: newVital.userId,
    waterIntakeDbo: waterIntakeDbo,
    bloodPressureDbo: bloodPressureDbo,
    createdAt: newVital.createdAt
  });
};

module.exports.getVitalByID = async ({ vitalID, userID }) => {
  const vital = await prisma.vital.findFirst({
    where: {
      id: vitalID,
      userId: userID
    },
    include: {
      waterIntake: true,
      bloodPressure: true
    },
  });

  if (!vital) {
    return null;
  }

  return newDbo({
    id: vital.id,
    notes: vital.notes,
    pulse: vital.pulse,
    bodyTemperature: vital.bodyTemperature,
    userId: vital.userId,
    waterIntakeDbo: createWaterIntakeDbo(vital.waterIntake),
    bloodPressureDbo: createBloodPressureDbo(vital.bloodPressure),
    createdAt: vital.createdAt
  });
}

module.exports.getAllVitals = async ({ userID }) => {
  const vitals = await prisma.vital.findMany({
    where: {
      userId: userID
    },
    include: {
      waterIntake: true,
      bloodPressure: true
    },
  }
  );

  const allVitalDbos = [];

  for (let vital of vitals) {
    const vitalDbo = newDbo({
      id: vital.id,
      notes: vital.notes,
      pulse: vital.pulse,
      bodyTemperature: vital.bodyTemperature,
      userId: vital.userId,
      waterIntakeDbo: createWaterIntakeDbo(vital.waterIntake),
      bloodPressureDbo: createBloodPressureDbo(vital.bloodPressure),
      createdAt: vital.createdAt
    });
    allVitalDbos.push(vitalDbo);
  }

  return allVitalDbos;
}

const newDbo = ({ id, notes, pulse, bodyTemperature, userId, waterIntakeDbo, bloodPressureDbo, createdAt }) => {
  return new VitalDbo({
    id: id,
    notes: notes,
    pulse: pulse,
    bodyTemperature: bodyTemperature,
    userId: userId,
    waterIntakeDbo: waterIntakeDbo,
    bloodPressureDbo: bloodPressureDbo,
    createdAt: createdAt
  });
}
