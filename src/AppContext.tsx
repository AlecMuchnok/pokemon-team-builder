import { createContext } from "react";
import type { APIData, Type, Pokedex } from "./types";

export const DataContext = createContext<{ allPokemon: APIData[], allTypes: Type[], allPokedexes: Pokedex[], idToSpecies: Map<number, string> }>({
  allPokemon: [],
  allTypes: [],
  allPokedexes: [],
  idToSpecies: new Map(),
});
