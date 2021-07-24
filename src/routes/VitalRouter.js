const express = require('express');
const router = express.Router();

const Controller = require('../controller/VitalController');

router.use(function timeLog(req, res, next) {
  console.log('Vital Route: ', Date.now());
  next();
});

router.post('/', Controller.new);
/*router.delete('/:id', Controller.delete);
router.post('/:id', Controller.edit);
router.get('/', Controller.getAll);
router.get('/:id', Controller.get);*/

module.exports = router;