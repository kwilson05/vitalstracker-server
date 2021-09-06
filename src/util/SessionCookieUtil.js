

module.exports.cookieFiveDayMaxAge = () => {
  // 5 days expiration; maxage is in miliseconds
  return 60 * 60 * 24 * 5 * 1000;
}


module.exports.cookieOptions = ({ maxAge, isHttpOnly, isSecure }) => {

  const cookieOptions = { maxAge: maxAge, httpOnly: isHttpOnly, secure: isSecure };


  return cookieOptions;

}

