const Sequelize = require('sequelize')
const db = require('../db')

const WordcountEntry = db.define('wordcountEntry', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  wordcount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = WordcountEntry;
