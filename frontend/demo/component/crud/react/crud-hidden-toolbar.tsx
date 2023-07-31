import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Crud } from '@hilla/react-components/Crud.js';
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
      {/* Adding the hiddenToolbar prop hides the toolbar */}
      <Crud include="firstName, lastName" items={items} onSizeChanged={() => {}} hiddenToolbar />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
