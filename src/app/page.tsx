'use client';

import { useEffect, useState } from 'react';
import { getUsers } from './api/user';
import { setUsers } from './features/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './api/store';
import UserItem from '@/components/User';
import { User } from '@/types/User';
import classNames from 'classnames';

export default function Home() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const userPerPage = 8;
	const users = useSelector((state: RootState) => state.users.results);

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const users = await getUsers();
				dispatch(setUsers(users));
			} catch (err) {
				console.log(err);
				setError('Не удалось загрузить данные. Попробуйте еще раз.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();
	}, [dispatch]);

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

	const totalPages = users ? Math.ceil(users.length / userPerPage) : 1;

	if (isLoading) {
		return <div className='text-white'> loading</div>;
	}

	if (error) {
		return <div className='text-white'> error</div>;
	}

	return (
		<div className=''>
			<h1 className='text-2xl font-bold mb-4 text-green-500'>Персонажі Rick & Morty</h1>
			<div className='flex my-6'>
				<input placeholder='Enter name' className='bg-green-500 text-white p-2 w-2/3  rounded-3xl my-0 mx-auto' />
			</div>
			{!error && !isLoading && users && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-auto '>
					{users.map((user: User) => (
						<UserItem key={user.id} user={user} />
					))}
				</div>
			)}
			{!error && !isLoading && users && (
				<div className='flex justify-center mt-16'>
					<button onClick={() => handlePrevPage()} className={classNames('w-10', 'h-10', 'rounded-3xl', 'border-2', 'hover:bg-gray-200', { 'bg-gray-200 text-white': currentPage === 1 })}>
						{'<'}
					</button>
					<div>
						{Array.from({ length: totalPages }, (_, index) => (
							<button onClick={() => setCurrentPage(index + 1)} className={classNames('w-10', 'h-10', 'border-2', 'mx-1', 'rounded-3xl', 'hover:bg-green-200', { 'bg-green-500 ': index + 1 === currentPage })} key={index}>
								{index + 1}
							</button>
						))}
					</div>
					<button onClick={() => handleNextPage()} className={classNames('w-10', 'h-10', 'rounded-3xl', 'border-2', 'hover:bg-gray-200', { 'bg-gray-200 text-white': currentPage === totalPages })}>
						{'>'}
					</button>{' '}
				</div>
			)}
		</div>
	);
}
