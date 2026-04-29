import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { APIData, Pokedex, Type } from '../types';
import type { APIResponse } from './apiTypes';

export const pokeApi = createApi({
	reducerPath: 'pokeApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
	endpoints: (builder) => ({
		getAllPokemon: builder.query<APIData[], void>({
			query: () => 'pokemon?limit=2000',
			transformResponse: (response: APIResponse<APIData>) => response.results,
		}),
		getAllPokedexes: builder.query<APIData[], void>({
			query: () => 'pokedex?limit=100',
			transformResponse: (response: APIResponse<APIData>) =>
				response.results.map((r) => ({
					...r,
					name: r.name
						.split('-')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' '),
				})),
		}),
		getPokedex: builder.query<Pokedex, string>({
			query: (name) => `pokedex/${name}`,
			transformResponse: (response: {
				name: string;
				pokemon_entries: { entry_number: number; pokemon_species: { name: string } }[];
			}): Pokedex => ({
				name: response.name,
				pokemon: Object.fromEntries(
					response.pokemon_entries.map((e) => [e.pokemon_species.name, e.entry_number])
				),
			}),
		}),
		getType: builder.query<Type, number>({
			query: (id) => `type/${id}`,
		}),
	}),
})

export const {
	useGetAllPokemonQuery,
	useGetAllPokedexesQuery,
	useGetPokedexQuery,
	useGetTypeQuery,
} = pokeApi