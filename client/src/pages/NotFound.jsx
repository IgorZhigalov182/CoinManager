import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        height: '90%',
        position: 'absolute',
        alignItems: 'center',
      }}
      className="container-fluid d-flex justify-content-center align-middle">
      <div>
        <h1 className="display-3 ">404</h1>
        <h1 className="display-3">Страница не найдена</h1>
      </div>
    </div>
  );
};

export default NotFound;
