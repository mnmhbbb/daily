import { FormEvent, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Test from './components/Test';
import { ReducerType } from './rootReducer';
import { addUser, User } from './slices/users';
import GlobalStyle from './styles/global';
import Switch from './components/Switch';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  const users = useSelector<ReducerType, User[]>((state) => state.users);
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addUser({ name } as User));
    setName('');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Test>Hello!</Test>
      <Switch />
      <form onSubmit={handleAddUser}>
        <input type='text' value={name} onChange={handleChangeName} />
        <button type='submit'>Add User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </ThemeProvider>
  );
}

export default App;
