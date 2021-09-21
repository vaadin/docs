type User = Readonly<{
  first: string;
  last: string;
}>;

// tag::snippet[]
const user: User = { first: 'John', last: 'Doe' };

// Making a shallow copy of "user" data with changes.
const changed = { ...user, first: 'Jane' };

// You can do the same for arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const unitedArr = [...arr1, ...arr2];
const onlyEvenArr = unitedArr.filter((val) => val % 2 === 0);
// end::snippet[]
