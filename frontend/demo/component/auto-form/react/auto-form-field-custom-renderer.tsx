import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { AutoForm } from '@vaadin/hilla-react-crud';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints.js';

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      fieldOptions={{
        description: {
          renderer: ({ field }) => <TextArea {...field} label="Full description" />,
        },
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
