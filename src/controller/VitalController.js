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
    const vitalDbo = await newVital({ vital: vital, userID: parseInt(res.locals.user.userID) });

    res.status(200).send(vitalDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not create new vitalDbo' });
  }
}

module.exports.get = async (req, res) => {
  try {
    const vitalDbo = await getVitalByID({ vitalID: parseInt(req.params.vitalID), userID: parseInt(res.locals.user.userID) });

    if (!vitalDbo) {
      res.status(404).send({ error: `Vital does not exist for vitalDbo id ${req.params.vitalID}` });
      return;
    }

    res.status(200).send(vitalDbo.json());
  }
  catch (err) {

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

    const vitalDbo = await getVitalByID({ vitalID: parseInt(vitalID), userID: parseInt(res.locals.user.userID) });
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

    const vitalDbo = await getVitalByID({ vitalID: parseInt(vitalID), userID: parseInt(res.locals.user.userID) });
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
    console.log(err);
    res.status(500).send({ error: `Could not delete vital` });
  }
}

module.exports.all = async (req, res) => {
  try {

    const vitalDbos = await getAllVitals({ userID: parseInt(res.locals.user.userID) });

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
