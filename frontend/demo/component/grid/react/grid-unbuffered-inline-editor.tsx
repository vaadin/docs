import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { EmailField } from '@hilla/react-components/EmailField.js';

// tag::snippet[]
function Example() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState({});

  // Assume these functions to get, update, and delete the items are defined elsewhere
  const getItems = () => {};
  const updateItem = () => {};
  const deleteItem = () => {};

  const startEdit = (item) => {
    setEditingItem(item);
  };

  const cancelEdit = () => {
    setEditingItem({});
  };

  const saveItem = (item) => {
    updateItem(item);
    setEditingItem({});
  };

  const removeItem = (item) => {
    deleteItem(item);
  };

  const columnsConfig = [
    { path: 'firstName', header: 'First name' },
    { path: 'lastName', header: 'Last name' },
    { path: 'email', header: 'Email' },
    {
      header: 'Actions',
      renderer: ({ item }) =>
        editingItem === item ? (
          <VerticalLayout theme="spacing">
            <Icon
              icon="vaadin:check-circle"
              title={`Save ${item.firstName} ${item.lastName}`}
              onClick={() => saveItem(item)}
            />
            <Icon
              icon="vaadin:times-circle"
              title={`Cancel ${item.firstName} ${item.lastName}`}
              onClick={cancelEdit}
            />
          </VerticalLayout>
        ) : (
          <VerticalLayout theme="spacing">
            <Icon
              icon="vaadin:pencil"
              title={`Edit ${item.firstName} ${item.lastName}`}
              onClick={() => startEdit(item)}
            />
            <Icon
              icon="vaadin:trash"
              title={`Remove ${item.firstName} ${item.lastName}`}
              onClick={() => removeItem(item)}
            />
          </VerticalLayout>
        ),
    },
  ];

  return (
    <>
      <Grid
        items={items}
        columnsConfig={columnsConfig}
        // Implement the required properties for data fetching and editing
        lazyData={true}
        onGridDataRequested={() => getItems().then(setItems)}
        rowDetailsRenderer={({ item }) =>
          editingItem === item ? (
            <tr>
              <td colspan={columnsConfig.length}>
                <TextField label="First name" value={editingItem.firstName} />
                <TextField label="Last name" value={editingItem.lastName} />
                <EmailField label="Email" value={editingItem.email} />
              </td>
            </tr>
          ) : null
        }
      />
    </>
  );
}
// end::snippet[]

export default reactExample(Example);
