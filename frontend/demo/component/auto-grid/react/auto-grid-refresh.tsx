import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { autoGridHostStyles } from './auto-grid-host-styles'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { AutoGrid, type AutoGridRef } from '@hilla/react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  function addEmployee() {
    const employee = EmployeeModel.createEmptyValue();
    employee.firstName = 'New';
    employee.lastName = 'Employee';
    employee.startDate = '1999-12-31';
    EmployeeService.save(employee);
  }
  // tag::snippet[]
  const autoGridRef = React.useRef<AutoGridRef>(null);

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  return (
    <VerticalLayout>
      <HorizontalLayout>
        <Button
          onClick={() => {
            addEmployee();
          }}
        >
          Add Employee
        </Button>
        <Button
          onClick={() => {
            refreshGrid();
          }}
        >
          Refresh Data
        </Button>
      </HorizontalLayout>
      <AutoGrid service={EmployeeService} model={EmployeeModel} ref={autoGridRef} />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
