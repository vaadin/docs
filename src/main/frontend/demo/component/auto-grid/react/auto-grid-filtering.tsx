import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { Select, type SelectItem } from '@vaadin/react-components/Select.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import type AndFilter from 'Frontend/generated/com/vaadin/hilla/crud/filter/AndFilter';
import type PropertyStringFilter from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/com/vaadin/hilla/crud/filter/PropertyStringFilter/Matcher';
import { ProductService } from 'Frontend/generated/endpoints';
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line

const categories: SelectItem[] = [
  { label: 'All', value: 'All' },
  { label: 'Fruit', value: 'Fruit' },
  { label: 'Vegetable', value: 'Vegetable' },
];

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const categoryFilterValue = useSignal(categories[0].value!);
  const nameFilterValue = useSignal('');
  const filter = useComputed(() => {
    const categoryFilter: PropertyStringFilter = {
      propertyId: 'category',
      filterValue: categoryFilterValue.value,
      matcher: Matcher.EQUALS,
      '@type': 'propertyString',
    };

    const nameFilter: PropertyStringFilter = {
      propertyId: 'name',
      filterValue: nameFilterValue.value,
      matcher: Matcher.CONTAINS,
      '@type': 'propertyString',
    };

    const andFilter: AndFilter = {
      '@type': 'and',
      children: [nameFilter, categoryFilter],
    };

    return categoryFilterValue.value === 'All' ? nameFilter : andFilter;
  });

  return (
    <div className="flex flex-col items-start gap-m">
      <div className="flex items-baseline gap-m">
        <Select
          label="Filter by category"
          items={categories}
          value={categoryFilterValue.value}
          onValueChanged={(e) => {
            categoryFilterValue.value = e.detail.value;
          }}
        />
        <TextField
          label="Filter by name"
          value={nameFilterValue.value}
          onValueChanged={(e) => {
            nameFilterValue.value = e.detail.value;
          }}
        />
      </div>
      <AutoGrid
        service={ProductService}
        model={ProductModel}
        experimentalFilter={filter.value}
        noHeaderFilters
      />
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
