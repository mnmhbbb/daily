import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodosContextProvier } from './contexts/TodosContext';

function App() {
  return (
    <div>
      <TodosContextProvier>
        <TodoForm />
        <TodoList />
      </TodosContextProvier>
    </div>
  );
}

export default App;
