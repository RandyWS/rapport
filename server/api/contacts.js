const router = require("express").Router();
const { User, Contact } = require("../db");
const jwt = require("jsonwebtoken");

// This is middleware that checks the JWT token in the cookie to see if it's valid
// if it is, we call next(), otherwise we send a 401 Unauthorized
const secret = process.env.JWT;

const authRequired = (req, res, next) => {
  // We grab the token from the cookies
  const token = req.signedCookies.token;
  // jwt verify throws an exception when the token isn't valid
  try {
    jwt.verify(token, secret);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    return;
  }
  next();
};

router.get("/authenticated/:userId", authRequired, async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    res.send({
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
