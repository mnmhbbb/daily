import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import ListContainer from './ListContainer';

import { loadTasks } from './actions';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  return (
    <div>
      <h1>To-do</h1>
      <ListContainer />
    </div>
  );
}
