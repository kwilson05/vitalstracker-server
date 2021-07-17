const {
  newVital,
} = require('../factory/VitalFactory');

module.exports.new = async (req, res) => {
  try {
    const vital = req.body.vital;
    const vitalDbo = await newVital(vital);
    res.status(200).send(vitalDbo.json);
  }
  catch (err) {
    res.status(500).send({ error: 'Could not create new vital' });
  }
}
