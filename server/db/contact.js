const Sequelize = require("sequelize");
const db = require("./database");

const Contact = db.define("contact", {
  content: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Contact;
