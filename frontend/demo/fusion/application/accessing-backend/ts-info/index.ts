// Import and use a declaration from another module
import type City from './city';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cityObject: City = {
  country: 'Finland',
  name: 'Turku',
};
// Note: cityObject is not exported, thus it is only available in this file
