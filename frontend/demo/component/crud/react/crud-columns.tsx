import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Crud } from '@vaadin/react-components';
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
      {/* Use 'include' or 'exclude' to select which fields to show */}
      <Crud
        items={items}
        exclude="lastName, address, id, subscribe, membership, pictureUrl, manager"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
