
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from '@tanstack/react-router';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export default function CharacterDetail() {
  const { id } = useParams({ from: '/character/$id' });

  const { data } = useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () =>
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.data),
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} width={200} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
    </div>
  );
}

