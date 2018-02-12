const router = require('express').Router()
const { Project, WordcountEntry } = require('../db/models')
const Op = require('sequelize').Op;

module.exports = router

router.post('/', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.create({ ...req.body, userId: req.user.id })
    .then((projects) => res.json(projects))
    .catch(next);
})

// res.json sends an array of projects with the wordcounts included
router.get('/', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.findAll({
    where: {
      userId: req.user.id
    },
  })
    // passing along all the promises works now but it's a pain
    // refactor later with async await perhaps?
    .then(projects => {
      if (!projects) return res.send(404);
      return Promise.all(projects.map(project => {
        return Promise.all([project, project.getWordcount()]);
      }));
    })
    .then((weirdArrayOfProjects) => {
      const projects = weirdArrayOfProjects.map(projectArr => {
        const [project, wordcount] = projectArr;
        // must be formatted this way (with .dataValues) to send the expected JSON
        // if you just add wordcount to project, it won't show up
        return { ...project.dataValues, wordcount }
      })
      res.json(projects);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  if (!req.user || !req.user.id) return res.send(403);
  Project.findOne({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
    include: [WordcountEntry],
  })
    .then((project) => {
      if (project) return res.json(project);
      else res.send(404);
    })
    .catch(next);
})


router.get('/:id/entries/all', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.findOne({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
    include: [WordcountEntry],
  })
    .then((project) => {
      if (project) return res.json(project.wordcountEntries);
      else res.send(404);
    })
    .catch(next);
})


router.get('/:id/entries', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.findOne({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
    include: [
      {
        model: WordcountEntry,
        where: {
          date: {
            [Op.gt]: new Date(new Date() - 365 * 24 * 60 * 60 * 1000),
            [Op.lt]: Date.now(),
          }
        }
      }],
    order: [[{ model: WordcountEntry}, 'date', 'ASC']]

  })
    .then((project) => {
      if (project) return res.json(project.wordcountEntries);
      else res.send(404);
    })
    .catch(next);
})


router.post('/:id', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.findOne({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
  })
    .then(project => {
      if (!project) return res.send(400);
      return WordcountEntry.create({
        ...req.body,
        projectId: project.id,
      })
        .catch(next)

    })
})
