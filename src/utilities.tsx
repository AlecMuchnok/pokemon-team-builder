import type { Type } from "./types";

export function flattenDamageRelations(damage_relations: DamageRelations) {
  // Maps type name to effectiveness
  const offense : Map<string, number> = new Map();

  for (const type of damage_relations.double_damage_to) {
    offense.set(type.name, 2);
  }

  for (const type of damage_relations.half_damage_to) {
    offense.set(type.name, 0.5);
  }

  for (const type of damage_relations.no_damage_to) {
    offense.set(type.name, 0);
  }

  const defense : Map<string, number> = new Map();

  for (const type of damage_relations.double_damage_from) {
    defense.set(type.name, 2);
  }

  for (const type of damage_relations.half_damage_from) {
    defense.set(type.name, 0.5);
  }

  for (const type of damage_relations.no_damage_from) {
    defense.set(type.name, 0);
  }

  return { offense, defense }
}

interface DamageRelations {
  double_damage_from: Type[],
  double_damage_to: Type[],
  half_damage_from: Type[],
  half_damage_to: Type[],
  no_damage_from: Type[],
  no_damage_to: Type[],
}