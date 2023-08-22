import React, { useState } from 'react';
import './NewPost.scss';

export const NewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setMessageError(false);
    setMessageSuccess(false);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
    setMessageError(false);
    setMessageSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError(false);
    setMessageSuccess(false);

    if (title.trim() === '' || body.trim() === '') {
      setMessageError(true);
      return;
    }

    setIsLoading(true);

    const newPost = {
      title,
      body,
      userId: 1,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setMessageSuccess(true);
        setTitle('');
        setBody('');
      })
      .catch((error) => {
        setMessageError(true);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="newpost_container">
      <div className="newpost_title">Add new post</div>
      <div className="newpost_window">
        <form className="newpost_content" onSubmit={handleSubmit}>
          <input
            className="newpost__inpt"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            className="newpost__inpt"
            type="text"
            placeholder="Body"
            value={body}
            onChange={handleBodyChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Enter'}
          </button>
        </form>
        <div className="message-container">
        {messageError && <p className="error-message message">You have entered incorrect data.</p>}
        {messageSuccess && <p className="success-message message">Congratulations, your post has been successfully added!</p>}
      </div>
      </div>
    </div>
  );
};
