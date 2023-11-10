import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { ExperimentalAutoCrud as AutoCrud } from '@hilla/react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';

function Example() {
  return (
    // tag::snippet[]
    <AutoCrud
      service={EmployeeService}
      model={EmployeeModel}
      formProps={{
        visibleFields: ['firstName', 'lastName', 'active', 'startDate', 'gender', 'version'],
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
