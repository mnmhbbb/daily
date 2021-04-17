import React, { createContext, Dispatch, useContext, useReducer } from 'react';

// 각 state에 대한 type을 다른 컴포넌트에서도 사용할 수 있게 내보내기
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// state는 Todo type으로 이루어진 배열
type TodosState = Todo[];

// state 전용 context
const TodosStateContext = createContext<TodosState | undefined>(undefined);

// action에 대한 type
type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

type TodosDispatch = Dispatch<Action>;

// action 전용 context
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined);

// reducer
function todoReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
      });
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error('error');
  }
}

// provider
export function TodosContextProvier({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'TypeScript 배우기',
      done: true,
    },
    {
      id: 3,
      text: 'TypeScript 와 Context API 함께 사용하기',
      done: false,
    },
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>{children}</TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

// 커스텀 훅
export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}
