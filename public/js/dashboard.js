// Function handling the posting of a new 'idea'.
const newFormHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim(); 
 
  
  // 
  if (post_title) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ "post_title": post_title, "post_info": post_content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //console.log(response.json()); 
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create idea');
    }
  }
};

// Function handling the deletion of an 'idea'in the users profile view.
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Event handlers for buttons in profile.handlebars.
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
