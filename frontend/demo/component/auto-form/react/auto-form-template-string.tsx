import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      customLayoutRenderer={{
        template: [
          ['firstName', 'lastName', 'gender'],
          ['dateOfBirth', 'email'],
          ['startDate', 'endDate', 'active'],
          ['team', 'manager'],
          ['description'],
        ],
      }}
    />
    // end::snippet[]
  );
}
// end::apply-backend[]

export default reactExample(Example); // hidden-source-line
