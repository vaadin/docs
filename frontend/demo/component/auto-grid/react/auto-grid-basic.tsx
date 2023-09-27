import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AutoGrid } from '@hilla/react-grid';
// tag::apply-backend[]
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoGrid service={ProductService} model={ProductModel}/>
    // end::snippet[]
  );
}
// end::apply-backend[]

export default reactExample(Example); // hidden-source-line
