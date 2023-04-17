const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// Route POSTs a new 'idea' to idea_db.
router.post('/', withAuth, async (req, res) => {

 
  try {
    console.log(req.body); 
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);

  } catch (err) {
    res.status(400).json(err);

  }
});
// Route to delete an 'idea' from idea_db. Logs message when a user deletes an 'idea'.
router.delete('/:id', withAuth, async (req, res) => {

  try {
    // idea.destroy is killing the 'idea' whose 'delete' button was clicked.
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No idea found with this id!' });
     
      return;
    }

    res.status(200).json(postData);
   
  } catch (err) {
    res.status(500).json(err);
  
  }
});

module.exports = router;
