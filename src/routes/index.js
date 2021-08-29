const VitalRouter = require('./VitalRouter');
const UserRouter = require('./UserRouter');
const RegisterRouter = require('./RegisterRouter');
const SessionRouter = require("./SessionRouter");
const SignoutRouter = require("./SignoutRouter");
const SigninRouter = require("./SigninRouter");
const AxiosRouter = require("./AxiosRouter");

module.exports = function (app) {
  app.use('/vital', AxiosRouter, VitalRouter);
  app.use('/register', AxiosRouter, RegisterRouter);
  app.use('/user', AxiosRouter, UserRouter);
  app.use('/session', SessionRouter);
  app.use('/signout', AxiosRouter, SignoutRouter);
  app.use('/signin', AxiosRouter, SigninRouter);
}
