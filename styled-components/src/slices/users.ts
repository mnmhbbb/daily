import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
}

const initialState = [{ id: '', name: '' }];

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      action.payload.id = uuidv4();
      return [...state, action.payload];
    },
  },
});

export const { addUser } = users.actions;
export default users.reducer;
