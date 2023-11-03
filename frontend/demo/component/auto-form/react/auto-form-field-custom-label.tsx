import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line

import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/form/EmployeeModel';

function Example() {
  return
  // tag::snippet[]
          <AutoForm service={EmployeeService} model={EmployeeModel}
                   fieldOptions={{
                     firstName: { label: 'Employee First name' },
                     lastName: { label: 'Employee Last name' },
                   }}
          />;

}
// end::apply-backend[]


export default reactExample(Example); // hidden-source-line
