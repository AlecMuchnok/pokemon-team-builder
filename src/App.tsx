import './App.css'
import { FilterablePokemonTable } from './PokemonTable';
import { PokemonTeam } from './PokemonTeam';
import { TeamCoverage } from './TeamCoverage';

export default function App() {
  return (
    <div className="flex flex-wrap justify-center items-start min-h-screen p-4">
      <PokemonTeam />
      <TeamCoverage />
      <FilterablePokemonTable />
    </div>
  )
}
