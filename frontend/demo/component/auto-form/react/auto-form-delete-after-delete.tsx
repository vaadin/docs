import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { AutoForm } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import type Employee from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee';
import Gender from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee/Gender';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const existingItem: Employee = {
    firstName: 'Jennifer',
    lastName: 'Smith',
    gender: Gender.NON_BINARY,
    startDate: '2014-08-05',
    active: true,
    description: 'Customer Service Manager',
  };
  const editedItem = useSignal<Employee | null>(null);
  const showDeleteButton = useSignal<boolean>(false);

  const handleEdit = () => {
    editedItem.value = existingItem;
  };

  const handleCreate = () => {
    editedItem.value = null;
  };

  const toggleDeleteButtonVisibility = () => {
    showDeleteButton.value = !showDeleteButton.value;
  };

  const handleDeleteSuccess = ({ item }: { item: Employee }) => {
    const json = JSON.stringify(item);
    Notification.show(`Item deleted: ${json}`);
  };

  return (
    <VerticalLayout>
      <HorizontalLayout theme="spacing">
        <Button onClick={handleEdit}>Edit item</Button>
        <Button onClick={handleCreate}>Create item</Button>
        <Button onClick={toggleDeleteButtonVisibility}>
          {showDeleteButton.value ? 'Hide Delete Button' : 'Show Delete Button'}
        </Button>
      </HorizontalLayout>
      <AutoForm
        service={EmployeeService}
        model={EmployeeModel}
        item={editedItem.value}
        deleteButtonVisible={showDeleteButton.value}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
