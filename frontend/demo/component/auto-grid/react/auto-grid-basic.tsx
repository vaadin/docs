import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
// tag::snippet[]
import { AutoGrid } from '@vaadin/hilla-react-crud';
// tag::apply-backend[]
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import { ProductService } from 'Frontend/generated/endpoints';
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line

function Example() {
  return <AutoGrid service={ProductService} model={ProductModel} />;
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
