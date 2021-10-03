const VitalRouter = require('./VitalRouter');
const UserRouter = require('./UserRouter');
const AuthCookieRouter = require('./AuthCookieRouter');
const SessionRouter = require("./SessionRouter");
const AxiosRouter = require("./AxiosRouter");

module.exports = function (app) {
  app.use('/vital', AxiosRouter, AuthCookieRouter, VitalRouter);
  app.use('/user', AxiosRouter, UserRouter);
  app.use('/session', SessionRouter);
}
