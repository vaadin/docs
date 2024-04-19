import type FilterUnion from 'Frontend/generated/com/vaadin/hilla/crud/filter/FilterUnion';
import Matcher from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter/Matcher';
import type Pageable from 'Frontend/generated/com/vaadin/hilla/mappedtypes/Pageable';
import type { CrudService } from '@vaadin/hilla-react-crud';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';

type AbstractEntity = { id?: any };

/**
 * Returns the value of a property in an object recursively.
 */
function getPropertyValue(item: any, propertyId: string): any {
  const parts = propertyId.split('.');
  let value = item;
  parts.forEach((part) => {
    value = value?.[part];
  });
  return value;
}

/**
 * Returns all matchers that apply to the given values.
 */
function compare(val1: string, val2: string): Matcher[] {
  const contains = val1.toUpperCase().includes(val2.toUpperCase());
  const matchers: Matcher[] = contains ? [Matcher.CONTAINS] : [];

  let c1: any = val1;
  let c2: any = val2;

  const date1 = Date.parse(val1);
  const date2 = Date.parse(val2);

  if (date1 && date2) {
    c1 = date1;
    c2 = date2;
  }

  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);

  if (num1 && num2 && num1.toString() === val1 && num2.toString() === val2) {
    c1 = num1;
    c2 = num2;
  }

  if (c1 > c2) {
    matchers.push(Matcher.GREATER_THAN);
  } else if (c1 < c2) {
    matchers.push(Matcher.LESS_THAN);
  } else {
    matchers.push(Matcher.EQUALS);
  }

  return matchers;
}

/**
 * Applies a filter recursively to an object.
 */
function applyFilter<T>(item: T, filter: FilterUnion): boolean {
  if (filter['@type'] === 'and') {
    return filter.children.every((child) => applyFilter(item, child as FilterUnion));
  } else if (filter['@type'] === 'or') {
    return filter.children.some((child) => applyFilter(item, child as FilterUnion));
  }
  const propertyValue = getPropertyValue(item, filter.propertyId) ?? '';
  const matchers = compare(propertyValue.toString(), filter.filterValue);
  return matchers.includes(filter.matcher);
}

export class CrudMockService<T extends AbstractEntity> implements CrudService<T> {
  private items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  /**
   * List all items that match the given filter and pageable, like in Spring Data.
   */
  async list(pageable: Pageable, filter: FilterUnion | undefined): Promise<T[]> {
    const filtered = this.items.filter((item) => !filter || applyFilter(item, filter));
    pageable.sort.orders.forEach((order) => {
      if (order) {
        filtered.sort((a, b) => {
          const aValue = getPropertyValue(a, order.property) ?? '';
          const bValue = getPropertyValue(b, order.property) ?? '';
          const matchers = compare(aValue.toString(), bValue.toString());

          if (order.direction === Direction.ASC) {
            if (matchers.includes(Matcher.GREATER_THAN)) {
              return 1;
            } else if (matchers.includes(Matcher.LESS_THAN)) {
              return -1;
            }
            return 0;
          }
          if (matchers.includes(Matcher.GREATER_THAN)) {
            return -1;
          } else if (matchers.includes(Matcher.LESS_THAN)) {
            return 1;
          }
          return 0;
        });
      }
    });

    const start = pageable.pageNumber * pageable.pageSize;
    const end = start + pageable.pageSize;
    return Promise.resolve(filtered.slice(start, end));
  }

  async save(item: T): Promise<T> {
    const existingIndex = this.items.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      this.items[existingIndex] = item;
    } else {
      this.items.push({
        ...item,
        id: this.items.map((it) => it.id).reduce((a, b) => Math.max(a, b), 0) + 1,
      });
    }
    return Promise.resolve(item);
  }

  async delete(id: any): Promise<void> {
    const existingIndex = this.items.findIndex((i) => i.id === id);
    if (existingIndex >= 0) {
      this.items.splice(existingIndex, 1);
    }
    return Promise.resolve();
  }
}
