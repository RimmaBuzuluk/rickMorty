'use client';

import { Location } from '@/types/Location';
import { useEffect, useState } from 'react';

export default function Page() {
	const [locations, setLocations] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://rickandmortyapi.com/api/location');
			const data = await response.json();
			setLocations(data.results);
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

					{/* Посилання на резидентів */}
					{location.residents.length > 0 && (
						<div>
							<h4>Резиденти:</h4>
							<ul>
								{location.residents.slice(0, 5).map((residentUrl: string, index) => (
									<li key={index}>
										<a href={residentUrl} target='_blank' rel='noopener noreferrer'>
											Перейти до резидента {index + 1}
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
