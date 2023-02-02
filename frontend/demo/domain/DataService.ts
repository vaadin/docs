import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import type Card from 'Frontend/generated/com/vaadin/demo/domain/Card';
import type RawReport from 'Frontend/generated/com/vaadin/demo/domain/Report';
import type ServiceHealth from 'Frontend/generated/com/vaadin/demo/domain/ServiceHealth';
import type UserPermissions from 'Frontend/generated/com/vaadin/demo/domain/UserPermissions';
import type ViewEvent from 'Frontend/generated/com/vaadin/demo/domain/ViewEvent';

const datasetCache: Record<string, any> = {};

async function getDataset<T>(fileName: string, count?: number): Promise<T[]> {
  if (!datasetCache[fileName]) {
    datasetCache[fileName] = (await import(`../../../src/main/resources/data/${fileName}`)).default;
  }

  // Create deep clones to avoid sharing the same item instances between examples
  return datasetCache[fileName].slice(0, count).map((item: T) => ({ ...item }));
}

export const getCountries = async (count?: number): Promise<Country[]> =>
  getDataset<Country>('countries.json', count);

export const getCards = async (count?: number): Promise<Card[]> =>
  getDataset<Card>('cards.json', count);

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
    people = people.filter((person) => person.managerId === options?.managerId);
  }

  const hierarchyLevelSize = people.length;
  const startIndex = options?.startIndex ?? 0;
  const count = options?.count ? startIndex + options.count : undefined;

  people = people.slice(startIndex, count);
  people = people.map((person, index) => ({
    ...person,
    pictureUrl: peopleImages[index % peopleImages.length],
    manager: allPeople.some((p) => p.managerId === person.id),
  }));
  return {
    people,
    hierarchyLevelSize,
  };
}

export const getUserPermissions = async (): Promise<readonly UserPermissions[]> =>
  getDataset<UserPermissions>('permissions.json');

export enum ReportStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In progress',
  CANCELLED = 'Cancelled',
  ON_HOLD = 'On hold',
}

export type Report = Omit<RawReport, 'status'> &
  Readonly<{
    status: ReportStatus;
  }>;

export const getReports = async (): Promise<readonly Report[]> =>
  getDataset<Report>('reports.json');

export const getServiceHealth = async (): Promise<ServiceHealth[]> =>
  getDataset<ServiceHealth>('serviceHealth.json');

export const getViewEvents = async (): Promise<ViewEvent[]> =>
  getDataset<ViewEvent>('viewEvents.json');
