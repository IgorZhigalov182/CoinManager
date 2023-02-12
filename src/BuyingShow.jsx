import React, { useState, useEffect } from 'react';

const BuyingShow = () => {
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

  return (
    <div>
      {posts.map((item) => (
        <h3>{item.sum}</h3>
      ))}
    </div>
  );
};

export default BuyingShow;
