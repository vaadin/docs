import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';

// Use inline definitions of filters as the generated ones are broken at the moment

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Filter {}

export interface AndFilter extends Filter {
  children: Array<Filter>;
  t: 'and';
}

export interface OrFilter extends Filter {
  children: Array<Filter>;
  t: 'or';
}

export interface PropertyStringFilter extends Filter {
  propertyId: string;
  filterValue: string;
  matcher: Matcher;
  t: 'propertyString';
}

export type FilterUnion = OrFilter | AndFilter | PropertyStringFilter;

/**
 * Returns the value of a property in an object recursively.
 */
function getPropertyValue(item: any, propertyId: string): any {
  const parts = propertyId.split('.');
  let value = item;
  parts.forEach((part) => {
    value = value && value[part];
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
  if (filter.t === 'and') {
    return filter.children.every((child) => {
      return applyFilter(item, child as FilterUnion);
    });
  } else if (filter.t === 'or') {
    return filter.children.some((child) => {
      return applyFilter(item, child as FilterUnion);
    });
  } else {
    const propertyValue = getPropertyValue(item, filter.propertyId) ?? '';
    const matchers = compare(propertyValue.toString(), filter.filterValue);
    return matchers.includes(filter.matcher);
  }
}

/**
 * List all items that match the given filter and pageable, like in Spring Data.
 */
export function listItems<T>(
  items: T[],
  pageable: Pageable,
  filter: FilterUnion | undefined
): Array<T> {
  const filtered = items.filter((item) => !filter || applyFilter(item, filter));
  pageable.sort.orders.forEach((order) => {
    if (order) {
      filtered.sort((a, b) => {
        const aValue = getPropertyValue(a, order.property) ?? '';
        const bValue = getPropertyValue(b, order.property) ?? '';
        const matchers = compare(aValue.toString(), bValue.toString());

        if (order.direction === 'ASC') {
          if (matchers.includes(Matcher.GREATER_THAN)) {
            return 1;
          } else if (matchers.includes(Matcher.LESS_THAN)) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (matchers.includes(Matcher.GREATER_THAN)) {
            return -1;
          } else if (matchers.includes(Matcher.LESS_THAN)) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
  });

  const start = pageable.pageNumber * pageable.pageSize;
  const end = start + pageable.pageSize;
  return filtered.slice(start, end);
}
