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
// 추후 Provider를 사용하지 않았을 때에는 Context의 값이 undefined 가 되어야 하므로
const TodosStateContext = createContext<TodosState | undefined>(undefined);

// action에 대한 type
type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

// 이렇게 Dispatch 를 리액트 패키지에서 불러와서 Generic으로 액션들의 타입을 넣어주면
// 추후 컴포넌트에서 액션을 디스패치 할 때 액션들에 대한 타입을 검사 할 수 있습니다.
// 예를 들어서, 액션에 추가적으로 필요한 값 (예: text, id)이 빠지면 오류가 발생하죠.
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
