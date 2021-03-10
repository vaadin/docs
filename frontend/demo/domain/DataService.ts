import Country from '../../generated/com/vaadin/demo/domain/Country';
import Person from '../../generated/com/vaadin/demo/domain/Person';
import Card from '../../generated/com/vaadin/demo/domain/Card';

const datasetCache: { [key: string]: any[] } = {};
async function getDataset<T>(fileName: string, count?: number): Promise<T[]> {
  if (!datasetCache[fileName]) {
    datasetCache[fileName] = (await import('../../../src/main/resources/data/' + fileName)).default;
  }
  return datasetCache[fileName].slice(0, count).map(item => {
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

export type PeopleOptions = {
  managerId?: number | null;
  count?: number;
  startIndex?: number;
};

export type PeopleResults = {
  people: Person[];
  hierarhcyLevelSize: number;
};
export async function getPeople(options?: PeopleOptions): Promise<PeopleResults> {
  if (!peopleImages) {
    peopleImages = (await import('../../../src/main/resources/data/peopleImages.json')).default;
  }
  let people: Person[] = await getDataset<Person>('people.json');
  people = people.map(person => {
    return {
      ...person,
      manager: people.some(p => p.managerId === person.id)
    };
  });

  if (options?.managerId !== undefined) {
    people = people.filter(person => person.managerId == options?.managerId);
  }

  const hierarhcyLevelSize = people.length;

  const startIndex = options?.startIndex || 0;
  const count = options?.count ? startIndex + options.count : undefined;

  people = people.slice(startIndex, count);
  people = people.map((person, index) => {
    return {
      ...person,
      pictureUrl: peopleImages[index % peopleImages.length]
    };
  });
  return {
    people,
    hierarhcyLevelSize
  };
}
