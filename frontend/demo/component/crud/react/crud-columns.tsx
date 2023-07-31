import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Crud } from '@hilla/react-components/Crud.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
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
      <Crud items={items}>
        <Crud.Column
          exclude={[
            'lastName',
            'address',
            'id',
            'subscribe',
            'membership',
            'pictureUrl',
            'manager',
          ]}
        />
      </Crud>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
