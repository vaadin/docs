import { Country } from './Country';
import type { Person } from './Person';

const datasetCache: { [key: string]: any[] } = {};
async function getDataset<T>(fileName: string, count?: number): Promise<T[]> {
  if (!datasetCache[fileName]) {
    datasetCache[fileName] = (await import('../../../src/main/resources/data/' + fileName)).default;
  }
  return datasetCache[fileName].slice(0, count);
}

export async function getCountries(count?: number): Promise<Country[]> {
  return await getDataset<Country>('countries.json', count);
}

export async function getPeople(count?: number): Promise<Person[]> {
  return (await getDataset<Person>('people.json', count)).map((person) => {
    return {
      ...person,
      // string id's are more convenient for the TS examples
      id: String(person.id)
    };
  });
}
