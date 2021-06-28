const router = require('express').Router();
const userRoutes = require('./userRoutes');
const wikiRoutes = require('./wikiRoutes');

router.use('/users', userRoutes);
router.use('/wiki', wikiRoutes);

module.exports = router;