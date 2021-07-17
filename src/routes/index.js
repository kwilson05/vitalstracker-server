const VitalRouter = require('./VitalRouter');

module.exports = function (app) {
  app.use('/vital', VitalRouter);
}
