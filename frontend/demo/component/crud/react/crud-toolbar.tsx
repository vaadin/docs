import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Crud } from '@hilla/react-components/Crud.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  const [items, setItems] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Crud
        include="firstName, lastName"
        items={items}
        onSizeChanged={() => null}
        toolbar={() => (
          <HorizontalLayout style={{ alignItems: 'center', flexGrow: 1 }}>
            <span>
              Total: <b>{items.length}</b> employees
            </span>
          </HorizontalLayout>
        )}
        newButton={() => (
          <Button theme="tertiary">
            <Icon icon="vaadin:plus" slot="prefix" />
            New employee
          </Button>
        )}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
