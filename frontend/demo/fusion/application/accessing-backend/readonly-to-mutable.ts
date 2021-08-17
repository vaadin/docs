interface City {
  country: string;
  name: string;
}

// tag::snippet[]
const collection: ReadonlyArray<string | undefined> = [];
const city: City = { name: 'Turku', country: 'Finland' };

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

const mutableCollection = collection as Array<string | undefined>;
const mutableCity = city as Mutable<City>;
// end::snippet[]
