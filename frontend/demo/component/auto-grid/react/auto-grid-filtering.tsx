import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line
import React, { useMemo, useState } from 'react';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import Matcher from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter/Matcher';
import { TextField } from '@vaadin/react-components/TextField.js';
import { Select, SelectItem } from '@vaadin/react-components/Select.js';
import PropertyStringFilter from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter';
import AndFilter from 'Frontend/generated/com/vaadin/hilla/crud/filter/AndFilter';

const categories: SelectItem[] = [
  { label: 'All', value: 'All' },
  { label: 'Fruit', value: 'Fruit' },
  { label: 'Vegetable', value: 'Vegetable' },
];

function Example() {
  // tag::snippet[]
  const [categoryFilterValue, setCategoryFilterValue] = useState(categories[0].value!);
  const [nameFilterValue, setNameFilterValue] = useState('');
  const filter = useMemo(() => {
    const categoryFilter: PropertyStringFilter = {
      propertyId: 'category',
      filterValue: categoryFilterValue,
      matcher: Matcher.EQUALS,
      '@type': 'propertyString',
    };

    const nameFilter: PropertyStringFilter = {
      propertyId: 'name',
      filterValue: nameFilterValue,
      matcher: Matcher.CONTAINS,
      '@type': 'propertyString',
    };

    const andFilter: AndFilter = {
      '@type': 'and',
      children: [nameFilter, categoryFilter],
    };

    return categoryFilterValue == 'All' ? nameFilter : andFilter;
  }, [categoryFilterValue, nameFilterValue]);

  return (
    <div className="flex flex-col items-start gap-m">
      <div className="flex items-baseline gap-m">
        <Select
          label="Filter by category"
          items={categories}
          value={categoryFilterValue}
          onValueChanged={(e) => setCategoryFilterValue(e.detail.value)}
        />
        <TextField
          label="Filter by name"
          value={nameFilterValue}
          onValueChanged={(e) => setNameFilterValue(e.detail.value)}
        />
      </div>
      <AutoGrid
        service={ProductService}
        model={ProductModel}
        experimentalFilter={filter}
        noHeaderFilters
      />
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
