import people from '../../../src/main/resources/data/people.json';
import type { Person } from './Person';

export function getPeople(count: number = 0): Person[] {
  return people.slice(0, count || undefined);
}
