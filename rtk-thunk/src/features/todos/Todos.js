import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTodos } from './todosSlice';

const Todos = () => {
  const todos = useDispatch(selectTodos);

  return (
    <>
      <h1>Todo</h1>
      <input />
    </>
  );
};

export default Todos;
