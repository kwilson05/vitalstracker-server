const {
  newVital,
} = require('../factory/VitalFactory');

module.exports.new = async (req, res) => {
  try {
    const vital = req.body;
    const vitalDbo = await newVital(vital);

    res.status(200).send(await vitalDbo.json());
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not create new vital' });
  }
}
