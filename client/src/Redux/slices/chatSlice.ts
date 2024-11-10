import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    name: null,
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const { setUser, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;