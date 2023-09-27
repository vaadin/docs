import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, {
  useState
} from 'react';
import { AutoGrid } from '@hilla/react-grid';
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import Person
  from "Frontend/generated/com/vaadin/demo/domain/Person";
import Product
  from "Frontend/generated/com/vaadin/demo/fusion/crud/Product";

function Example() {
  // tag::snippet[]
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  return (
    <AutoGrid
      service={ProductService}
      model={ProductModel}
      selectedItems={selectedItems}
      onActiveItemChanged={(e) => {
        const item = e.detail.value;
        setSelectedItems(item ? [item] : []);
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
