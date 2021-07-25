const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const VitalDbo = require('../model/VitalDbo');
const { newWaterIntake, waterIntakeDbo } = require('./WaterIntakeFactory');
const { newBloodPressure, bloodPressureDbo } = require('./BloodPressureFactory');

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
    userId: vital.userId,
    waterIntake: waterIntakeDbo,
    bloodPressure: bloodPressureDbo,
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
    waterIntake: vital.waterIntake,
    bloodPressure: vital.bloodPressure,
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
    allVitalDbos.push(newDbo(vital));
  }

  return allVitalDbos;
}

const newDbo = ({ id, notes, pulse, bodyTemperature, userId, waterIntake, bloodPressure, createdAt }) => {
  return new VitalDbo({
    id: id,
    notes: notes,
    pulse: pulse,
    bodyTemperature: bodyTemperature,
    userId: userId,
    waterIntake: waterIntakeDbo(waterIntake),
    bloodPressure: bloodPressureDbo(bloodPressure),
    createdAt: createdAt
  });
}
