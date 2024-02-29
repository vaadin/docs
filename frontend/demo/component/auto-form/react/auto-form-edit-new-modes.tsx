import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { AutoForm } from '@vaadin/hilla-react-crud';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import Gender from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee/Gender';
import type Employee from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Button } from '@vaadin/react-components/Button.js';
import { Notification } from '@vaadin/react-components/Notification.js';

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
  const [editedItem, setEditedItem] = useState<Employee | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleEdit = () => {
    setEditedItem(existingItem);
  };

  const handleCreate = () => {
    setEditedItem(null);
  };

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleSubmitSuccess = ({ item }: { item: Employee }) => {
    const json = JSON.stringify(item);
    Notification.show(`Form was submitted: ${json}`);
  };

  return (
    <VerticalLayout>
      <HorizontalLayout theme="spacing">
        <Button onClick={handleEdit}>Edit item</Button>
        <Button onClick={handleCreate}>Create item</Button>
        <Button onClick={toggleDisabled}>{disabled ? 'Enable Form' : 'Disable Form'}</Button>
      </HorizontalLayout>
      <AutoForm
        service={EmployeeService}
        model={EmployeeModel}
        item={editedItem}
        disabled={disabled}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
