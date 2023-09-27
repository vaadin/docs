import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, {
  useMemo,
  useState
} from 'react';
import { AutoGrid } from '@hilla/react-grid';
import { ProductService } from 'Frontend/generated/endpoints';
import ProductModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/ProductModel';
import {TextField} from "@hilla/react-components/TextField.js";

function Example() {
  // tag::snippet[]
  const [filterValue, setFilterValue] = useState("");
  const nameFilter = useMemo(() => {
    return {
      t: "propertyString",
      propertyId: "name",
      matcher: "CONTAINS",
      filterValue,
    };
  }, [filterValue]);

  return (
    <div className="flex flex-col items-start gap-m p-l">
      <TextField
        value={filterValue}
        onValueChanged={(e) => setFilterValue(e.detail.value)}
        label="Filter by name"
      />
      <AutoGrid
        service={ProductService}
        model={ProductModel}
        filter={nameFilter}
      />
    </div>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
