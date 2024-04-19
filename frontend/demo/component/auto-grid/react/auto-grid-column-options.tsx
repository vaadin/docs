import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line
import React from 'react';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import type Product from 'Frontend/generated/com/vaadin/demo/fusion/crud/Product';

// tag::snippet[]
function PriceRenderer({ item }: { item: Product }) {
  const { price } = item;
  const color = price > 4 ? 'red' : 'green';
  return <span style={{ fontWeight: 'bold', color }}>{price}</span>;
}

function Example() {
  return (
    <AutoGrid
      service={ProductService}
      model={ProductModel}
      columnOptions={{
        price: {
          renderer: PriceRenderer,
        },
      }}
    />
  );
}
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
