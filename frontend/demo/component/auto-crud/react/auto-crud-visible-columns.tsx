import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { ExperimentalAutoCrud as AutoCrud } from '@hilla/react-crud';
// tag::apply-backend[]
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';

function Example() {
  return (
    <AutoCrud
      service={EmployeeService}
      model={EmployeeModel}
      gridProps={{ visibleColumns: ['firstName', 'lastName', 'active', 'team', 'manager'] }}
    />
  );
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example); // hidden-source-line
