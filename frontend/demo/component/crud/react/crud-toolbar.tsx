import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Crud } from '@hilla/react-components/Crud.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Crud include="firstName, lastName" items={items} onSizeChanged={() => null}>
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
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
