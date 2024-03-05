import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Button, Crud, HorizontalLayout, Icon } from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import '@vaadin/icons';

function Example() {
  const [items, setItems] = useState<Person[]>([]);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
    setEmployeeCount(items.length);
  }, []);

  return (
    // tag::snippet[]
    <Crud
      include="firstName, lastName"
      items={items}
      onSizeChanged={() => {
        if (items.length !== employeeCount) {
          setEmployeeCount(items.length);
        }
      }}
    >
      <HorizontalLayout slot="toolbar" style={{ alignItems: 'center', flexGrow: 1 }}>
        <span>
          Total: <b>{items.length}</b> employees
        </span>
      </HorizontalLayout>

      <Button theme="tertiary" slot="new-button">
        <Icon icon="vaadin:plus" slot="prefix" />
        New employee
      </Button>
    </Crud>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
