const router = require('express').Router();
const courseRoutes = require('./user-route');
const studentRoutes = require('./thought-route');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
