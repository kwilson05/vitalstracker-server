const VitalRouter = require('./VitalRouter');
const UserRouter = require('./UserRouter');

module.exports = function (app) {
  app.use('/vital', VitalRouter);
  app.use('/user', UserRouter);
}
