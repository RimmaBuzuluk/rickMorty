import { User } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
	name: 'users',
	initialState: [] as User[],
	reducers: {
		setUsers(_users: User[], action: PayloadAction<User[]>) {
			return action.payload;
		},
	},
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
