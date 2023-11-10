import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line

import { ExperimentalAutoForm as AutoForm } from '@hilla/react-crud';
// tag::apply-backend[]

import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints';
import Gender from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee/Gender';
import Employee from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Notification } from '@hilla/react-components/Notification.js';
// tag::snippet[]
function Example() {
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
    <VerticalLayout>
      <AutoForm
        service={EmployeeService}
        model={EmployeeModel}
        item={existingItem}
        deleteButtonVisible
        onSubmitError={handleOnSubmitError}
        onDeleteError={handleOnDeleteError}
      />
    </VerticalLayout>
  );
}
// end::apply-backend[]
// end::snippet[]

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
