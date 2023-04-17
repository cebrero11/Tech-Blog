const router = require('express').Router();
const { User } = require('../../models');


// Route for submitting new user data to idea_db.
router.post('/', async (req, res) => {

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(400).json(err);
  
  }
});

// Route for logging in as a user.
router.post('/login', async (req, res) => {

  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
     
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    // Error handling if someone without credentials tries logging in.
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
    
  }
});

// Route for logging out of a user's session.
router.post('/logout', (req, res) => {

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
