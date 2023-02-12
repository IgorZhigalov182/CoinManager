import React, { useState } from 'react';

const Login = () => {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const target = e.target;
    // // const value = target.value;
    setDisabled(true);
    setTimeout(() => {
      addPost();
      alert(JSON.stringify(data, null, 2));
    }, 2000);
    setDisabled(false);
  };

  //   отправка на сервер

  const addPost = async () => {
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <h1>
        <form
          action=""
          onSubmit={handleSubmit}
          onChange={handleChange}
          style={{ textAlign: 'center' }}>
          <input type="text" name="name" placeholder="name" value={data.name} />
          {<br />}
          <input type="email" name="email" placeholder="email" value={data.email} />
          {<br />}
          <input type="password" name="password" placeholder="password" value={data.password} />
          {<br />}
          <button disabled={disabled}>Send</button>
        </form>
      </h1>
    </div>
  );
};

export default Login;
