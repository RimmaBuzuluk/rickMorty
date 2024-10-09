import { Episode } from '@/types/Episode';

type Props = {
	episode: Episode;
};

export default function EpisodeItem({ episode }: Props) {
	return (
		<div className=''>
			<div>{episode.episode}</div>
			<div>{episode.name}</div>
			<div>{episode.air_date}</div>
		</div>
	);
}
