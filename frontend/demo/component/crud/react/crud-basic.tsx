import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Crud } from '@hilla/react-components/Crud.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

export function Example() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getPeople().then(({ people }) => setItems(people));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Crud include="firstName, lastName, email, profession" items={items} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
