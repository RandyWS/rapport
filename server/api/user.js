const router = require("express").Router();
const { User, Friend, Contact } = require("../db");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// This is middleware that checks the JWT token in the cookie to see if it's valid
// if it is, we call next(), otherwise we send a 401 Unauthorized
const secret = process.env.JWT;
const generateToken = (res, userId, username) => {
  const token = jwt.sign({ userId, username }, secret);
  return res.cookie("token", token, {
    secure: false, // set to true if your using https
    httpOnly: true,
    sameSite: "strict",
    httpOnly: true,
    signed: true,
  });
};

const authRequired = async (req, res, next) => {
  // We grab the token from the cookies
  const token = req.signedCookies.token || "";

  // jwt verify throws an exception when the token isn't valid
  try {
    if (!token) {
      return res.status(401).send("Please log in");
    }
    const decrypt = await jwt.verify(token, secret);
    req.user = {
      userId: decrypt.userId,
      username: decrypt.username,
    };

    next();
  } catch (error) {
    res.send({
      loggedIn: false,
      message: "Unauthorized",
    });
  }
};

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        userName: username,
      },
    });

    // if the username exists
    if (user) {
      // and they inputted the correct password
      if (await user.correctPassword(password)) {
        await generateToken(res, user.id, username);

        res.send({
          loggedIn: true,
          message: "Successfully Logged In",
        });
      } else {
        res.send({
          loggedIn: false,
          message: "Password may be incorrect",
        });
      }
    } else {
      res.send({
        loggedIn: false,
        message: "Username may not exist",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { userName } = req.body;
    const user = await User.create(req.body);

    await generateToken(res, user.id, userName);

    res.send({
      loggedIn: true,
      message: "Successfully Logged In",
      user,
    });
  } catch (error) {
    if (error.username === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    }

    next(error);
  }
});

// This logs the user out by clearing the token cookie
router.get("/logout", authRequired, (req, res, next) => {
  try {
    // We just clear the token cookie to log the user out.

    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

// This is an authenticated route, it uses our authRequired Middleware
// You can't see this unless you are logged in
router.get("/authenticated", authRequired, async (req, res, next) => {
  try {
    let user;

    if (req.signedCookies.token) {
      const token = req.signedCookies.token;
      const decoded = await promisify(jwt.verify)(token, secret);

      user = await User.findByPk(decoded.userId, {
        include: [
          {
            model: Friend,
            include: [{ model: Contact }],
          },
        ],
      });
    } else {
      user = null;
    }
    res.send({
      loggedIn: true,
      message: "user is logged in",
      user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
