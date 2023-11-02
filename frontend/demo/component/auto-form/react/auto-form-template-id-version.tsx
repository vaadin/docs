import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/form/EmployeeModel';

function Example() {
  return (
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      customLayoutRenderer={{
        template: [
          ['firstName', 'lastName', 'gender'],
          ['dateOfBirth', 'email'],
          ['startDate', 'endDate', 'active'],
          ['description'],
          ['id', 'version'],
        ],
      }}
    />
  );
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example); // hidden-source-line
