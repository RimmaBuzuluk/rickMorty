'use client';

import { Location } from '@/types/Location';
import { User } from '@/types/User';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
	const [locations, setLocations] = useState([]);
	const [characters, setCharacters] = useState<{ [key: number]: User[] }>({});
	const [showAll, setShowAll] = useState<{ [key: number]: boolean }>({});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://rickandmortyapi.com/api/location');
			const data = await response.json();
			setLocations(data.results);

			const characterPromises = data.results.map(async (location: Location) => {
				const characterResponses = await Promise.all(location.residents.map((url: string) => fetch(url)));
				const characterData = await Promise.all(characterResponses.map(res => res.json()));
				return { locationId: location.id, characters: characterData };
			});

			const characterData = await Promise.all(characterPromises);
			const charactersMap: { [key: number]: User[] } = {};
			characterData.forEach(({ locationId, characters }) => {
				charactersMap[locationId] = characters;
			});
			setCharacters(charactersMap);
		};
		fetchData();
	}, []);

	return (
		<div>
			<h1>Локації Rick and Morty</h1>

			{locations.map((location: Location) => (
				<div key={location.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
					<h2>{location.name}</h2>
					<p>
						<strong>Тип:</strong> {location.type}
					</p>
					<p>
						<strong>Вимір:</strong> {location.dimension}
					</p>
					<p>
						<strong>Кількість резидентів:</strong> {location.residents.length}
					</p>
					{characters[location.id] && (
						<div>
							<h4>Резиденти:</h4>
							<div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-6'>
								{(showAll[location.id] ? characters[location.id] : characters[location.id]?.slice(0, 6))?.map((character: User) => (
									<Link href={`/user/${character.id}`} key={character.id}>
										<img className='w-auto' src={character.image} alt={character.name} width={100} />
										<p className='text-xs'>{character.name}</p>
									</Link>
								))}
							</div>
							{location.residents.length > 6 && (
								<button className='mt-2 mb-4 bg-yellow-50 p-4 rounded-3xl text-green-600 hover:bg-yellow-600 ' onClick={() => setShowAll(prev => ({ ...prev, [location.id]: !prev[location.id] }))}>
									{showAll[location.id] ? 'Показати менше' : 'Показати всіх'}
								</button>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
