'use client';

import EpisodeItem from '@/components/Episode';
import { Episode } from '@/types/Episode';
import { User } from '@/types/User';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
	const [episodes, setEpisodes] = useState<Episode[]>([]);
	const [characters, setCharacters] = useState<{ [key: number]: User[] }>([]);
	const [showAll, setShowAll] = useState<{ [key: number]: boolean }>({});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://rickandmortyapi.com/api/episode');
			const data = await response.json();
			setEpisodes(data.results);

			const characterPromises = data.results.map(async (episode: Episode) => {
				const characterResponses = await Promise.all(episode.characters.map((url: string) => fetch(url)));
				const characterData = await Promise.all(characterResponses.map(res => res.json()));
				return { episodeId: episode.id, characters: characterData };
			});

			const characterData = await Promise.all(characterPromises);
			const charactersMap: { [key: number]: User[] } = {};
			characterData.forEach(({ episodeId, characters }) => {
				charactersMap[episodeId] = characters;
			});
			setCharacters(charactersMap);
		};
		fetchData();
	}, []);

	const toggleShowAll = (episodeId: number) => {
		setShowAll(prev => ({ ...prev, [episodeId]: !prev[episodeId] }));
	};

	console.log(characters);

	return (
		<div>
			{episodes.map((episode: Episode) => (
				<div key={episode.id} className='border-b-2 my-10'>
					<EpisodeItem episode={episode} />

					<div>
						<h3>Персонажі:</h3>
						<div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-6'>
							{(showAll[episode.id] ? characters[episode.id] : characters[episode.id]?.slice(0, 6))?.map((character: User) => (
								<Link href={`/user/${character.id}`} key={character.id}>
									<img className='w-auto' src={character.image} alt={character.name} width={100} />
									<p className='text-xs'>{character.name}</p>
								</Link>
							))}
						</div>
						{characters[episode.id]?.length > 6 && (
							<button className='mt-2 mb-4 bg-yellow-50 p-4 rounded-3xl text-green-600 hover:bg-yellow-600 ' onClick={() => toggleShowAll(episode.id)}>
								{showAll[episode.id] ? 'Показати менше' : 'Показати всіх'}
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
