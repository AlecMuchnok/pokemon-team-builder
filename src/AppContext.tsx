import { createContext } from "react";
import type { APIData, Pokemon, Type, Pokedex } from "./types";

export const DataContext = createContext<{ allPokemon: APIData[], allTypes: Type[], allPokedexes: Pokedex[] }>({
  allPokemon: [],
  allTypes: [],
  allPokedexes: [],
});

export const TeamContext = createContext<{
  team: Pokemon[],
  onPokemonClick: (pokemon: Pokemon) => void
}>({
  team: [],
  onPokemonClick: () => {},
});