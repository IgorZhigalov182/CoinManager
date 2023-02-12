import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch('http://localhost:3000/comments  ');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);

  return <div className="App">Hello World</div>;
}

export default App;
