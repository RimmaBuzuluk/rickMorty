import { User } from '@/types/User';
import Link from 'next/link';

type Props = {
	user: User;
};

export default function UserItem({ user }: Props) {
	return (
		<Link href={`/user/${user.id}`} key={user.id}>
			<div className='relative group' key={user.id}>
				<img src={user.image} alt={user.name} className='w-full h-full object-cover rounded-lg' />

				<div className='absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg'>
					<h3 className='text-xl font-bold mb-2 text-green-500'>{user.name}</h3>
					<p className='text-gray-600'>
						{user.status} - {user.species}
					</p>
				</div>
			</div>
		</Link>
	);
}
