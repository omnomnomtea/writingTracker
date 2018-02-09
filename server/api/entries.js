const router = require('express').Router()
const { WordcountEntry } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  if (!req.user.id) return res.send(403);
  WordcountEntry.findOne({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
    include: [WordcountEntry],
  })
    .then((wordcountEntry) => {
      if (wordcountEntry) return res.json(WordcountEntry);
      else res.send(404);
    })
    .catch(next);
})
