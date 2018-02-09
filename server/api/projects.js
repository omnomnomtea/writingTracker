const router = require('express').Router()
const { Project, WordcountEntry } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.create({ ...req.body, userId: req.user.id })
    .then((projects) => res.json(projects))
    .catch(next);
})

router.get('/', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  Project.findAll({
    where: {
      userId: req.user.id
    },
  })
    .then((projects) => {
      if (projects) return res.json(projects);
      else res.send(404);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  if (!req.user.id) return res.send(403);
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


router.get('/:id/entries', (req, res, next) => {
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
