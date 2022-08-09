import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Child from './Child';

function App() {
  console.log('App');
  const [name, setName] = useState('');

  // useEffect(() => {
  //   console.log('useEffect');
  //   return () => {
  //     console.log('return');
  //   };
  // });
  return (
    <div className='App' style={{ marginTop: '20px' }}>
      {name}
      <input onChange={(e) => setName(e.target.value)} />
      <Child />
    </div>
  );
}

export default App;
