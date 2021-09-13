const router = require("express").Router();
const { User, Friend, Contact } = require("../db");

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Friend,
          include: [{ model: Contact }],
        },
      ],
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
