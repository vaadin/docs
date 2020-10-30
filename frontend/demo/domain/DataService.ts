import { Country } from './Country';
import { Person } from './Person';
import { Card } from './Card';

const datasetCache: { [key: string]: any[] } = {};
async function getDataset<T>(fileName: string, count?: number): Promise<T[]> {
  if (!datasetCache[fileName]) {
    datasetCache[fileName] = (await import('../../../src/main/resources/data/' + fileName)).default;
  }
  return datasetCache[fileName].slice(0, count).map((item) => {
    // Create deep clones to avoid sharing the same item instances between examples
    return { ...item };
  });
}

export async function getCountries(count?: number): Promise<Country[]> {
  return await getDataset<Country>('countries.json', count);
}

export async function getCards(count?: number): Promise<Card[]> {
  return await getDataset<Card>('cards.json', count);
}

let peopleImages: string[];
export async function getPeople(count?: number): Promise<Person[]> {
  if (!peopleImages) {
    peopleImages = (await import('../../../src/main/resources/data/peopleImages.json')).default;
  }
  return (await getDataset<Person>('people.json', count)).map((person, index) => {
    return {
      ...person,
      pictureUrl: peopleImages[index % peopleImages.length],
      // string id's are more convenient for the TS examples
      id: String(person.id)
    };
  });
}
