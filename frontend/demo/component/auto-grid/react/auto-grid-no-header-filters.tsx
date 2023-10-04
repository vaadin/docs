import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line
import React from 'react';
import { AutoGrid } from '@hilla/react-grid';
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoGrid
      service={ProductService}
      model={ProductModel}
      noHeaderFilters={true}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
