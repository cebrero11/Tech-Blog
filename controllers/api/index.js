const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

const { route } = require('./userRoutes');
// const choiceRoutes = require('./choiceRoutes');

// Middleware for userRoutes, ideaRoutes, and voteRoutes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// router.use('/choices', choiceRoutes);

module.exports = router;
