const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/catalog');
});

module.exports = router;
