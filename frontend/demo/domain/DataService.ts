import Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import Card from 'Frontend/generated/com/vaadin/demo/domain/Card';

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

type PeopleOptions = {
  managerId?: number | null;
  count?: number;
  startIndex?: number;
};

type PeopleResults = {
  people: Person[];
  hierarchyLevelSize: number;
};
export async function getPeople(options?: PeopleOptions): Promise<PeopleResults> {
  if (!peopleImages) {
    peopleImages = (await import('../../../src/main/resources/data/peopleImages.json')).default;
  }
  const allPeople = await getDataset<Person>('people.json');

  let people = [...allPeople];

  if (options?.managerId !== undefined) {
    people = people.filter((person) => person.managerId == options?.managerId);
  }

  const hierarchyLevelSize = people.length;
  const startIndex = options?.startIndex || 0;
  const count = options?.count ? startIndex + options.count : undefined;

  people = people.slice(startIndex, count);
  people = people.map((person, index) => {
    return {
      ...person,
      pictureUrl: peopleImages[index % peopleImages.length],
      manager: allPeople.some((p) => p.managerId === person.id),
    };
  });
  return {
    people,
    hierarchyLevelSize,
  };
}
