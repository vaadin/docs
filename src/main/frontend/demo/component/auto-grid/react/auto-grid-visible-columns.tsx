import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import { ProductService } from 'Frontend/generated/endpoints';
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <AutoGrid
      service={ProductService}
      model={ProductModel}
      visibleColumns={['category', 'name', 'supplier.supplierName', 'price']}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
