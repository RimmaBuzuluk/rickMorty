import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { usersSlice } from '../features/users';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineSlices({
	users: usersSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export const selector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
