import React, { useEffect, useState } from 'react';
import AddCategory from './components/AddCategory';

function App() {
  return (
    <div className="App">
      <AddCategory item={{ name: 'Music', id: '1' }} />
      <AddCategory item={{ name: 'Razvlechenia', id: '2' }} />
      <AddCategory item={{ name: 'FastFood', id: '3' }} />
    </div>
  );
}

export default App;
