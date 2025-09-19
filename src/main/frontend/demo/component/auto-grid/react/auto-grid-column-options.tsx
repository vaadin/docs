import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import type Product from 'Frontend/generated/com/vaadin/demo/fusion/crud/Product';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import { ProductService } from 'Frontend/generated/endpoints';
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line

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
