import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useComboBoxDataProvider } from '@vaadin/hilla-react-crud';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { ComboBoxCountryService } from 'Frontend/generated/endpoints';

// tag::snippet[]
function Example() {
  // Create a data provider that calls a backend service with a
  // Spring Data pageable and the current combo box filter
  const dataProvider = useComboBoxDataProvider(
    ComboBoxCountryService.list.bind(ComboBoxCountryService)
  );

  return (
    <ComboBox dataProvider={dataProvider} label="Country" itemLabelPath="name" itemValuePath="id" />
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
