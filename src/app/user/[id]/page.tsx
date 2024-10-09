import { User } from '@/types/User';

type Props = {
	params: {
		id: string;
	};
};

export default async function UserPage({ params }: Props) {
	const { id } = params;

	const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
	const user: User = await res.json();

	return (
		<div className='flex justify-between items-center'>
			<img src={user.image} alt={user.name} className='w-1/2' />
			<div className='flex flex-col '>
				<h1>{user.name}</h1>

				<p>Status: {user.status}</p>
				<p>Species: {user.species}</p>
				<p>Gender: {user.gender}</p>
				<p>Origin: {user.origin?.name}</p>
				<p>Location: {user.location?.name}</p>
			</div>
		</div>
	);
}
