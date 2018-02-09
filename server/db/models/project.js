const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  startingWordcount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
})

module.exports = Project;

Project.prototype.getWordcount = function () {
  return this.getEntries()
    .then(entries => {
      return entries.reduce((acc, entry) => {
        return acc + entry.wordcount;
      }, 0)
    })
    .catch(console.error)
}
