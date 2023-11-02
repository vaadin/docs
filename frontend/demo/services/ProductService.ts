import FilterUnion from 'Frontend/generated/dev/hilla/crud/filter/FilterUnion.js';
import type Product from 'Frontend/generated/com/vaadin/demo/fusion/crud/Product.js';
import type Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable.js';
import Supplier from 'Frontend/generated/com/vaadin/demo/fusion/crud/Supplier.js';
import { listItems } from './CrudService.js';

const productData: Product[] = [
  { name: 'Apple', category: 'Fruit', price: 1.99, dateAdded: '2019-01-01' },
  { name: 'Banana', category: 'Fruit', price: 2.99, dateAdded: '2019-01-02' },
  { name: 'Carrot', category: 'Vegetable', price: 3.99, dateAdded: '2019-01-03' },
  { name: 'Eggplant', category: 'Vegetable', price: 5.99, dateAdded: '2019-01-05' },
  { name: 'Orange', category: 'Fruit', price: 2.49, dateAdded: '2019-01-06' },
  { name: 'Broccoli', category: 'Vegetable', price: 4.29, dateAdded: '2019-01-07' },
  { name: 'Grapes', category: 'Fruit', price: 3.79, dateAdded: '2019-01-08' },
  { name: 'Cucumber', category: 'Vegetable', price: 2.89, dateAdded: '2019-01-09' },
  { name: 'Strawberry', category: 'Fruit', price: 4.99, dateAdded: '2019-01-10' },
  { name: 'Tomato', category: 'Vegetable', price: 2.19, dateAdded: '2019-01-11' },
  { name: 'Pineapple', category: 'Fruit', price: 3.69, dateAdded: '2019-01-12' },
  { name: 'Spinach', category: 'Vegetable', price: 2.79, dateAdded: '2019-01-13' },
  { name: 'Blueberry', category: 'Fruit', price: 6.49, dateAdded: '2019-01-14' },
  { name: 'Bell Pepper', category: 'Vegetable', price: 1.99, dateAdded: '2019-01-15' },
  { name: 'Watermelon', category: 'Fruit', price: 7.99, dateAdded: '2019-01-16' },
  { name: 'Zucchini', category: 'Vegetable', price: 2.49, dateAdded: '2019-01-17' },
  { name: 'Mango', category: 'Fruit', price: 4.79, dateAdded: '2019-01-18' },
  { name: 'Asparagus', category: 'Vegetable', price: 3.29, dateAdded: '2019-01-19' },
  { name: 'Cherry', category: 'Fruit', price: 3.99, dateAdded: '2019-01-20' },
  { name: 'Potato', category: 'Vegetable', price: 1.49, dateAdded: '2019-01-21' },
  { name: 'Pear', category: 'Fruit', price: 2.59, dateAdded: '2019-01-22' },
  { name: 'Cantaloupe', category: 'Fruit', price: 3.99, dateAdded: '2019-01-23' },
  { name: 'Cauliflower', category: 'Vegetable', price: 2.19, dateAdded: '2019-01-24' },
  { name: 'Lemon', category: 'Fruit', price: 1.79, dateAdded: '2019-01-25' },
  { name: 'Cabbage', category: 'Vegetable', price: 1.69, dateAdded: '2019-01-26' },
  { name: 'Raspberry', category: 'Fruit', price: 5.29, dateAdded: '2019-01-27' },
  { name: 'Onion', category: 'Vegetable', price: 1.29, dateAdded: '2019-01-28' },
  { name: 'Kiwi', category: 'Fruit', price: 2.69, dateAdded: '2019-01-29' },
  { name: 'Green Bean', category: 'Vegetable', price: 2.39, dateAdded: '2019-01-30' },
  { name: 'Blackberry', category: 'Fruit', price: 4.49, dateAdded: '2019-01-31' },
  { name: 'Sweet Potato', category: 'Vegetable', price: 1.99, dateAdded: '2019-02-01' },
  { name: 'Peach', category: 'Fruit', price: 3.49, dateAdded: '2019-02-02' },
  { name: 'Celery', category: 'Vegetable', price: 1.89, dateAdded: '2019-02-03' },
  { name: 'Grapefruit', category: 'Fruit', price: 2.99, dateAdded: '2019-02-04' },
  { name: 'Radish', category: 'Vegetable', price: 1.29, dateAdded: '2019-02-05' },
  { name: 'Apricot', category: 'Fruit', price: 3.99, dateAdded: '2019-02-06' },
  { name: 'Brussels Sprout', category: 'Vegetable', price: 2.49, dateAdded: '2019-02-07' },
  { name: 'Artichoke', category: 'Vegetable', price: 3.99, dateAdded: '2019-02-09' },
  { name: 'Lime', category: 'Fruit', price: 1.49, dateAdded: '2019-02-10' },
  { name: 'Beet', category: 'Vegetable', price: 1.99, dateAdded: '2019-02-11' },
  { name: 'Plum', category: 'Fruit', price: 2.99, dateAdded: '2019-02-12' },
  { name: 'Corn', category: 'Vegetable', price: 1.49, dateAdded: '2019-02-13' },
  { name: 'Pomegranate', category: 'Fruit', price: 3.99, dateAdded: '2019-02-14' },
  { name: 'Garlic', category: 'Vegetable', price: 1.29, dateAdded: '2019-02-15' },
  { name: 'Papaya', category: 'Fruit', price: 4.99, dateAdded: '2019-02-16' },
  { name: 'Green Onion', category: 'Vegetable', price: 1.49, dateAdded: '2019-02-17' },
  { name: 'Ginger', category: 'Vegetable', price: 1.99, dateAdded: '2019-02-19' },
  { name: 'Parsley', category: 'Vegetable', price: 1.29, dateAdded: '2019-02-20' },
  { name: 'Parsnip', category: 'Vegetable', price: 1.99, dateAdded: '2019-02-21' },
  { name: 'Peas', category: 'Vegetable', price: 1.99, dateAdded: '2019-02-24' },
];

const supplierData: Supplier[] = [
  { id: 1, supplierName: 'FreshFoods Inc.', headquarterCity: 'New York' },
  { id: 2, supplierName: 'FarmProduce Co.', headquarterCity: 'Los Angeles' },
  { id: 3, supplierName: 'OrganicHarvest Ltd.', headquarterCity: 'Chicago' },
  { id: 4, supplierName: 'GardenGoodies Corp.', headquarterCity: 'Houston' },
  { id: 5, supplierName: 'GreenGrocers LLC', headquarterCity: 'Miami' },
];

let id = 0;

const products = productData.map((product) => ({
  ...product,
  price: Math.round(product.price),
  supplier: supplierData[id % supplierData.length],
  id: ++id,
}));

async function list(pageable: Pageable, filter: FilterUnion | undefined): Promise<Array<Product>> {
  return Promise.resolve(listItems(products, pageable, filter));
}

export default { list };
