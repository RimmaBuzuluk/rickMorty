import { User } from '@/types/User';

export function paginate<T>(data: T[], currentPage: number, itemsPerPage: number): T[] {
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	return data.slice(startIndex, endIndex);
}

export function getTotalPages(items: User[], itemsPerPage: number): number {
	return Math.ceil(items.length / itemsPerPage);
}
