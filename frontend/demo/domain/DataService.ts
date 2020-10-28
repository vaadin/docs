import type { Person } from './Person';

let people: Person[];

export async function getPeople(count?: number): Promise<Person[]> {
  if (!people) {
    people = (await import('../../../src/main/resources/data/people.json')).default.map(
      (person) => {
        return {
          ...person,
          // string id's are more convenient for the TS examples
          id: String(person.id)
        };
      }
    );
  }
  return people.slice(0, count);
}
