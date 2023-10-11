import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line
import React from 'react';
import { AutoGrid } from '@hilla/react-grid';
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import { GridColumn } from "@hilla/react-components/GridColumn";
import Product from "Frontend/generated/com/vaadin/demo/fusion/crud/Product";

function Example() {

  // tag::snippet[]
  function ManufacturerRenderer({ item }: { item: Product }) {
    const { manufacturer } = item;
    return <span>{manufacturer?.name} - {manufacturer?.headquarterCity}</span>;
  }

  return (
    <AutoGrid
      service={ProductService}
      model={ProductModel}
      visibleColumns={['category', 'name']}
      customColumns={[
        <GridColumn key={1}
                    autoWidth
                    renderer={ManufacturerRenderer}
                    header='Manufacturer' />]}
    />
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
