import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
// tag::snippet[]
import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]
//import * as EmployeeService from 'Frontend/generated/EmployeeService.js';

import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints.js';

function Example() {
  return <AutoForm service={EmployeeService} model={EmployeeModel} />;
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
