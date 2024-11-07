import { User } from '@/types/User';
import { users } from '../utils/fetchUser';

export const getUsers = () => {
	return users.get<User[]>(`/character`);
};
