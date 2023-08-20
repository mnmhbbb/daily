'use client';

import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <p>{count}</p>
      <button type="button" onClick={() => setCount((num) => num + 1)}>
        숫자 증가시키기 버튼
      </button>
    </div>
  );
};

export default Counter;
