import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '../types/types';

const initialState: ChatState = {
  email: null,
  name: null,
  messages: [] as Message[],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; name: string }>,
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },
  },
});

export const { setUser, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
