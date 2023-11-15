import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { AutoForm } from '@hilla/react-crud';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints';
import Gender from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee/Gender';
import Employee from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  // tag::snippet[]
  const existingItem: Employee = {
    firstName: 'Jennifer',
    lastName: 'Smith',
    gender: Gender.NON_BINARY,
    startDate: '2014-08-05',
    active: true,
    description: 'Customer Service Manager',
  };

  const handleOnSubmitError = ({ error }: { error: unknown }) => {
    const json = JSON.stringify(error);
    Notification.show('Error while submitting: ' + json);
  };

  const handleOnDeleteError = ({ error }: { error: unknown }) => {
    const json = JSON.stringify(error);
    Notification.show('Error while deleting: ' + json);
  };

  return (
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      item={existingItem}
      deleteButtonVisible
      onSubmitError={handleOnSubmitError}
      onDeleteError={handleOnDeleteError}
    />
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
