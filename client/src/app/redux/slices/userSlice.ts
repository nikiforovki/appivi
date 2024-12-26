import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/types';

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  subscription: null,
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string | undefined) => {
    if (!userId) {
      throw new Error('UserId is required');
    }
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    console.log('Данные, полученные с сервера:', user);

    return user;
  },
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: any) => {
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const user = await response.json();
    return user;
  },
);

export const updateUserSubscription = createAsyncThunk(
  'user/updateUserSubscription',
  async ({
    userId,
    subscription,
  }: {
    userId?: string;
    subscription?: string;
  }) => {
    if (!userId || !subscription) {
      throw new Error('UserId and subscription are required');
    }
    const response = await fetch(`/api/subscriptions/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscription }),
    });
    const user = await response.json();
    return user;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.subscription = action.payload.subscription;
      state.status = 'succeeded';
      state.error = null;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
      state.subscription = null;
      state.status = 'idle';
      state.error = null;
    },
    setSubscription: (state, action: PayloadAction<string | null>) => {
      state.subscription = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.email = action.payload.email;
          state.token = action.payload.token;
          state.id = action.payload.id;
          state.subscription = action.payload.subscription;
          state.error = null;
        } else {
          state.status = 'failed';
          state.error = 'Failed to fetch user data';
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.email = action.payload.email;
          state.token = action.payload.token;
          state.id = action.payload.id;
          state.subscription = action.payload.subscription;
          state.status = 'succeeded';
          state.error = null;
        } else {
          state.status = 'failed';
          state.error = 'Failed to create user';
        }
      })
      .addCase(updateUserSubscription.fulfilled, (state, action) => {
        if (action.payload) {
          state.subscription = action.payload.subscription;
          state.status = 'succeeded';
          state.error = null;
        } else {
          state.status = 'failed';
          state.error = 'Failed to update user subscription';
        }
      });
  },
});

export const { setUser, removeUser, setSubscription } = userSlice.actions;
export default userSlice.reducer;
