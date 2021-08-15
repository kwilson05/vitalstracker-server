module.exports.signout = (req, res) => {



  /*
     redirect using http status code 307 for a temporary redirect
     to keep the same request method (POST)
    */
  res.redirect(307, `/session/signout`);
}
