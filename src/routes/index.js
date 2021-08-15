const VitalRouter = require('./VitalRouter');
const UserRouter = require('./UserRouter');
const RegisterRouter = require('./RegisterRouter');
const SessionRouter = require("./SessionRouter");
const SignoutRouter = require("./SignoutRouter");
const SigninRouter = require("./SigninRouter");

module.exports = function (app) {
  app.use('/vital', VitalRouter);
  app.use('/register', RegisterRouter);
  app.use('/user', UserRouter);
  app.use('/session', SessionRouter);
  app.use('/signout', SignoutRouter);
  app.use('/signin', SigninRouter);
}
