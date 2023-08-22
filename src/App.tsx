import './App.scss';
import React, { useEffect, useState } from 'react'; // Import React object
import { Carousel } from './Carousel/Carousel';
import { Card } from './Card/Card';
import { Posts } from './types/Posts';
import { NewPost } from './NewPost/NewPost';

function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error) => console.error(error)); // Fixed error handling

    console.log(`xd`);
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}/comments`)
      .then((response) => response.json())
      .then((json) => setComments(json))
      .catch((error) => console.error(error)); // Fixed error handling

    console.log(selectedId);
  }, [selectedId]);

  return (
    <div className='app'>
      <Carousel>
        {posts.map((post) => (
          <Card post={post} comments={comments} setSelectedId={setSelectedId} key={post.id} />
        ))}
      </Carousel>
      {selectedId === 0 && <NewPost />}
    </div>
  );
}

export default App;
