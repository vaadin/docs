import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import type Product from 'Frontend/generated/com/vaadin/demo/fusion/crud/Product';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import { ProductService } from 'Frontend/generated/endpoints';
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const selectedItems = useSignal<Product[]>([]);

  return (
    <AutoGrid
      service={ProductService}
      model={ProductModel}
      selectedItems={selectedItems.value}
      onActiveItemChanged={(e) => {
        const item = e.detail.value;
        selectedItems.value = item ? [item] : [];
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
