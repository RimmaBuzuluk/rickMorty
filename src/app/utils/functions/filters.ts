import { User } from '@/types/User';

export function filterByName(user: User[] = [], query: string): User[] {
	let filteredUser = [...user];

	filteredUser = filteredUser.filter((user: User) => user.name.toLowerCase().includes(query));

	return filteredUser;
}
