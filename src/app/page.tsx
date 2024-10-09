'use client';

import UserItem from '@/components/User';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';

export default function Home() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://rickandmortyapi.com/api/character');
			const data = await response.json();
			setUsers(data.results);
		};
		fetchData();
	}, []);

	return (
		<div className=''>
			<h1 className='text-2xl font-bold mb-4'>Персонажі Rick & Morty</h1>

			{/* Контейнер з grid-сіткою */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-auto '>
				{users.map((user: User) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		</div>
	);
}
