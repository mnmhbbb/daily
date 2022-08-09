import { useState } from 'react';

function App() {
  const [num, setNum] = useState(0);

  const addNum = () => setNum((num) => num + 1);
  const subractNum = () => setNum((num) => num - 1);
  const multiplyNum = () => setNum((num) => num * 2);
  const multyplyAndAdd = () => {
    multiplyNum();
    addNum();
  };

  return (
    <>
      <h1>Number: {num}</h1>
      <button onClick={addNum}>+1</button>
      <button onClick={subractNum}>-1</button>
      <button onClick={multiplyNum}>*2</button>
      <button onClick={multyplyAndAdd}>*2 + 1</button>
    </>
  );
}

export default App;
