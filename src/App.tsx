import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { FilterablePokemonTable } from './PokemonTable';
import { PokemonTeam } from './PokemonTeam';
import { TeamCoverage } from './TeamCoverage';
import { DataContext } from './AppContext';
import { flattenDamageRelations } from './utilities';
import type { APIData, Type } from './types';

export default function App() {
  return (
    <DataContextProvider>
      <div className="flex flex-wrap justify-center items-start min-h-screen p-4">
        <PokemonTeam />
        <TeamCoverage />
        <FilterablePokemonTable />
      </div>
    </DataContextProvider>
  )
}

const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState<APIData[]>([]);
	const [allTypes, setAllTypes] = useState<Type[]>([]);

  const TYPE_COUNT = 18;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
      const json = await response.json();
      setAllPokemon(json.results);

      const types : Type[] = [];

      for (let i = 1; i <= TYPE_COUNT; i++) {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${i}`);
        const typeJson = await typeResponse.json();
        types.push({
          id: typeJson.id,
          name: typeJson.name,
          sprite: typeJson.sprites['generation-ix']['scarlet-violet'].name_icon,
          pokemon: new Array<string>(typeJson.pokemon.map((entry: { pokemon: { name: string } }) => entry.pokemon.name)),
          type_effectiveness: flattenDamageRelations(typeJson.damage_relations),
        });
      }

      setAllTypes(types);
    }

    fetchData();
  }, []);

  const contextValue = useMemo(() => ({
    allPokemon, allTypes
  }), [allPokemon, allTypes]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}
