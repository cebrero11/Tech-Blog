const router = require('express').Router();
const { request } = require('express');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');




// Route to get a list of ideas.
router.get('/', async (req, res) => {
 
  try {
    // Get all ideas and JOIN with user data
    const data = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = data.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
   
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a specific 'idea' by its ID in the params.
router.get('/posts/:id', async (req, res) => {
 
  try {
    const data = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
      ],
    });
    
    
    const post = data.get({ plain: true }); 
    console.log(post); 
    
    
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
 
  } catch (err) {
    res.status(500).json(err);

  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
 
  } catch (err) {
    res.status(500).json(err);

  }
});

// Router that takes users to the login screen.
router.get('/login', (req, res) => {
  
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  // Rendering login.handlebars
  res.render('login');
});

module.exports = router;
