import React, { useState, useEffect } from 'react';

const Operation = () => {
  const [data, setData] = useState({ sum: '', category: '', bankAccount: '', comment: '' });
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
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <div>
        <h1>
          <form
            action=""
            onSubmit={handleSubmit}
            onChange={handleChange}
            style={{ textAlign: 'center' }}>
            <input type="number" name="sum" placeholder="sum money" value={data.sum} />
            {<br />}
            <input type="text" name="category" placeholder="category" value={data.category} />
            {<br />}
            <input
              type="text"
              name="bankAccount"
              placeholder="choose bank account"
              value={data.bankAccount}
            />
            {<br />}
            <textarea
              type="text"
              name="comment"
              placeholder="enter you comment"
              value={data.comment}
            />
            {<br />}
            <button disabled={disabled}>Send</button>
          </form>
        </h1>
      </div>

      <div>
        
        {''}</div>
    </>
  );
};

export default Operation;
