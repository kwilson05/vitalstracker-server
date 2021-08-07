const VitalRouter = require('./VitalRouter');
const UserRouter = require('./UserRouter');
const RegisterRouter = require('./RegisterRouter');

module.exports = function (app) {
  app.use('/vital', VitalRouter);
  app.use('/register', RegisterRouter);
  app.use('/user', UserRouter);
}
