import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { AutoGrid } from '@hilla/react-crud';
// tag::apply-backend[]
import ProductService from 'Frontend/demo/services/ProductService';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';

function Example() {
  return <AutoGrid service={ProductService} model={ProductModel} />;
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
