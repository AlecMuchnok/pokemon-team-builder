import { createContext } from "react";
import type { APIData, Pokemon, Type } from "./types";

export const DataContext = createContext<{ allPokemon: APIData[], allTypes: Type[] }>({
  allPokemon: [],
  allTypes: [],
});

export const TeamContext = createContext<{
  team: Pokemon[],
  onPokemonClick: (pokemon: Pokemon) => void
}>({
  team: [],
  onPokemonClick: () => {},
});