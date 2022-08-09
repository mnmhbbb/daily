import React, { useState } from 'react';
import { useTodosDispatch } from '../contexts/TodosContext';

function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useTodosDispatch();

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      text: value,
    });
    setValue('');
  };

  return (
    <form onSubmit={onsubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="오늘의 할 일은?"
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default TodoForm;
