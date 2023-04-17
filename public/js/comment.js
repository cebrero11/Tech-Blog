// Function handling the posting of a new 'idea'.
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment' ).value.trim();
  const postId = document.querySelector('#postID').value.trim(); 
 
  
  // 
  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ "comment" : comment, "post_id" : postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //console.log(response.json()); 
      document.location.replace(`/posts/${postId}`);
    } else {
      alert('Failed to create idea');
    }
  }
};

// Function handling the deletion of an 'idea'in the users profile view.
// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to delete post');
//     }
//   }
// };

// Event handlers for buttons in profile.handlebars.
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);

