import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { AutoForm } from '@hilla/react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      fieldOptions={{
        firstName: { label: 'Employee First name' },
        lastName: { label: 'Employee Last name' },
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
