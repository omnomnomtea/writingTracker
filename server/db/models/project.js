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
  },
})

module.exports = Project;

Project.prototype.getWordcount = function () {
  return wordcount = this.getWordcountEntries()
    .then(entries => {
      const wordcount = entries.reduce((acc, entry) => {
        return acc + entry.wordcount;
      }, this.startingWordcount)
      console.log(wordcount)
      return wordcount;
    })
}
