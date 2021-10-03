const express = require('express');
const router = express.Router();

const { decodeClaims } = require('../util/FirebaseUtil');

router.use(async (req, res, next) => {
  console.log('Auth Cookie Route: ', Date.now());

  try {
    if (!res.locals.user && req.cookies.session) {
      //user details from cookie
      const userClaims = await decodeClaims(req.cookies.session);
      res.locals.user = userClaims;
      next();
    }
    else if (!res.locals.user || !req.cookie) {
      res.status(403).send({ error: "User isn't logged in" });
      return;
    }
    else {
      next();
    }
  }
  catch (err) {

    console.log(err);
  }

});

module.exports = router;
