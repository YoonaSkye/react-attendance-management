import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
// reducers
import usersReducer from './modules/users';
import checksReducer from './modules/checks';
import newsReducer from './modules/news';
import signsReducer from './modules/signs';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    checks: checksReducer,
    news: newsReducer,
    signs: signsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
