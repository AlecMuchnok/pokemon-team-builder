import { createContext } from "react";
import type { APIData, Type } from "./types";

export const DataContext = createContext<{ allPokemon: APIData[], allTypes: Type[] }>({
  allPokemon: [],
  allTypes: [],
});
