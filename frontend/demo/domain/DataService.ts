import type { Person } from './Person';

let people: Person[];

export async function getPeople(count?: number): Promise<Person[]> {
  if (!people) {
    people = (await import('../../../src/main/resources/data/people.json')).default;
  }
  return people.slice(0, count);
}
