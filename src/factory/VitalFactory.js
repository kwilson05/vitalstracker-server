const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const VitalDbo = require('../model/VitalDbo');
const { createWaterIntakeDbo } = require('./WaterIntakeFactory');
const { createBloodPressureDbo } = require('./BloodPressureFactory');
const { getWaterMeasurement } = require("../factory/WaterMeasurementFactory");

module.exports.newVital = async function ({ notes, pulse, bloodPressure, waterIntake, bodyTemperature }) {

  const vital = await prisma.vital.create({
    data: {
      notes: notes,
      pulse: pulse,
      bodyTemperature: bodyTemperature,
      userId: 1,
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


  const bloodPressureDbo = createBloodPressureDbo(vital.bloodPressure);

  const waterIntakeDbo = createWaterIntakeDbo(vital.waterIntake);


  return newDbo({
    id: vital.id,
    notes: vital.notes,
    pulse: vital.pulse,
    bodyTemperature: vital.bodyTemperature,
    userId: vital.userId,
    waterIntakeDbo: waterIntakeDbo,
    bloodPressureDbo: bloodPressureDbo,
    createdAt: vital.createdAt
  });
};

module.exports.getVitalByID = async (vitalID) => {
  const vital = await prisma.vital.findUnique({
    where: {
      id: vitalID
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

module.exports.getAllVitals = async () => {
  const vitals = await prisma.vital.findMany({
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
