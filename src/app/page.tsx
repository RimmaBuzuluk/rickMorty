'use client';

import UserItem from '@/components/User';
import { User } from '@/types/User';
import { useEffect, useMemo, useState } from 'react';
// import { arrLeft } from '../img/ArrowLeft.png';

export default function Home() {
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	// const [totalPages, setTotalPages] = useState(0);
	const userPerPage = 8;

	const totalPages = Math.ceil(users.length / userPerPage);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://rickandmortyapi.com/api/character');
			const data = await response.json();
			setUsers(data.results);
		};
		fetchData();
	}, []);

	const paginationItems = useMemo(() => {
		const indexOfLastItem = userPerPage * currentPage;
		const listOfFirstItem = indexOfLastItem - userPerPage;
		return users.slice(listOfFirstItem, indexOfLastItem);
	}, [users, currentPage]);
	// const totalPage = Math.floor(users.length / userPerPage);

	console.log(totalPages);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className=''>
			<h1 className='text-2xl font-bold mb-4'>Персонажі Rick & Morty</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-auto '>
				{paginationItems.map((user: User) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>

			<div className='flex justify-center mt-16'>
				<button onClick={() => handlePrevPage()} className='w-10 h-10 rounded-3xl border-2 hover: bc-gray'>
					{'<'}
				</button>{' '}
				<div>
					{Array.from({ length: totalPages }, (_, index) => (
						<button onClick={() => setCurrentPage(index + 1)} className='w-10 h-10 border-2 mx-1 rounded-3xl' key={index}>
							{index + 1}
						</button>
					))}
				</div>
				<button onClick={() => handleNextPage()} className='w-10 h-10 rounded-3xl border-2'>
					{'>'}
				</button>{' '}
			</div>
		</div>
	);
}
