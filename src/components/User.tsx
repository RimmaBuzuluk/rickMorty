import { User } from '@/types/User';
import Link from 'next/link';

type Props = {
	user: User;
};

export default function UserItem({ user }: Props) {
	return (
		<div className='border-x-zinc-500'>
			<Link href={`/user/${user.id}`} key={user.id}>
				<img src={user.image} className='w-full' />
				{user.name}
			</Link>
		</div>
	);
}
