const {
  newVital,
  getVitalByID,
  getAllVitals
} = require('../factory/VitalFactory');

module.exports.new = async (req, res) => {
  try {
    const vital = req.body;
    const vitalDbo = await newVital(vital);

    res.status(200).send(vitalDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not create new vital' });
  }
}

module.exports.get = async (req, res) => {
  try {
    const vitalDbo = await getVitalByID(parseInt(req.params.vitalID));

    if (!vitalDbo) {
      res.status(404).send({ error: `Vital does not exist for vital id ${req.params.vitalID}` });
    }

    res.status(200).send(vitalDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Error occured when looking for vital by id' });
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
    console.log(err);
    res.status(500).send({ error: 'Error occured when looking for all vitals' });
  }
}
