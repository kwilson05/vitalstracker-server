module.exports = {
  env:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'development'
      : 'production',
  port: process.env.PORT || 8081,
  pwd_cost_factor: 1,
  clientDomain: process.env.clientUrl || 'http://localhost:8080',
};
