import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints';

function Example() {
  return <AutoCrud service={EmployeeService} model={EmployeeModel} />;
}
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
