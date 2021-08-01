const {
  newVital,
  getVitalByID,
  getAllVitals
} = require('../factory/VitalFactory');

const { createWaterIntakeDbo } = require("../factory/WaterIntakeFactory");
const { createBloodPressureDbo } = require("../factory/BloodPressureFactory");

module.exports.new = async (req, res) => {
  try {
    const vital = req.body;
    const vitalDbo = await newVital(vital);

    res.status(200).send(vitalDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not create new vitalDbo' });
  }
}

module.exports.get = async (req, res) => {
  try {
    const vitalDbo = await getVitalByID(parseInt(req.params.vitalID));

    if (!vitalDbo) {
      res.status(404).send({ error: `Vital does not exist for vitalDbo id ${req.params.vitalID}` });
    }

    res.status(200).send(vitalDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Error occured when looking for vitalDbo by id' });
  }
}

module.exports.edit = async (req, res) => {
  try {
    const vitalID = req.params.vitalID;

    if (!vitalID) {
      res.status(400).send({
        errror:
          "Can't edit vitalDbo because vitalDbo id is missing"
      });
    }

    const vitalDbo = await getVitalByID(parseInt(vitalID));
    if (!vitalDbo) {
      res.status(400).send({
        errror:
          `A vitalDbo doesn't exist for vitalDbo id ${vitalID}`
      });
      return;
    }
    const newVital = req.body;
    vitalDbo.notes = newVital.notes;
    vitalDbo.pulse = newVital.pulse;
    vitalDbo.bloodPressureDbo = createBloodPressureDbo(newVital.bloodPressure);
    vitalDbo.waterIntakeDbo = createWaterIntakeDbo(newVital.waterIntake);
    vitalDbo.bodyTemperature = newVital.bodyTemperature;

    await vitalDbo.save();

    res.status(200).send(vitalDbo.json());

  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: `Could not edit vital` });
  }
}

module.exports.delete = async (req, res) => {
  try {
    const vitalID = req.params.vitalID;

    if (!vitalID) {
      res.status(400).send({
        errror:
          "Can't edit vitalDbo because vitalDbo id is missing"
      });
    }

    const vitalDbo = await getVitalByID(parseInt(vitalID));
    if (!vitalDbo) {
      res.status(400).send({
        errror:
          `A vitalDbo doesn't exist for vitalDbo id ${vitalID}`
      });
      return;
    }


    await vitalDbo.delete();

    res.status(200).send({});

  }
  catch (err) {
    res.status(500).send({ error: `Could not delete ${vitalID} vital` });
  }
}

module.exports.all = async (req, res) => {
  try {
    const vitalDbos = await getAllVitals();

    const vitalsJson = [];

    for (let vitalDbo of vitalDbos) {
      vitalsJson.push(vitalDbo.json());
    }

    res.status(200).send(vitalsJson);
  }
  catch (err) {
    res.status(500).send({ error: 'Error occured when looking for all vitals' });
  }
}
