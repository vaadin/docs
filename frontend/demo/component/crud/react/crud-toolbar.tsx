import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Crud } from '@vaadin/react-components-pro/Crud.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const employeeCount = useSignal(0);

  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
    employeeCount.value = items.value.length;
  }, []);

  return (
    // tag::snippet[]
    <Crud
      include="firstName, lastName"
      items={items.value}
      onSizeChanged={() => {
        if (items.value.length !== employeeCount.value) {
          employeeCount.value = items.value.length;
        }
      }}
    >
      <HorizontalLayout slot="toolbar" style={{ alignItems: 'center', flexGrow: 1 }}>
        <span>
          Total: <b>{employeeCount.value}</b> employees
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
