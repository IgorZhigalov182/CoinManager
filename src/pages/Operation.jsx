import React from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';

const Operation = () => {
  return (
    <div className="container">
      <BackButton />
      <h1>Хлебные крошки</h1>
      <CardOperation />
    </div>
  );
};

export default Operation;
