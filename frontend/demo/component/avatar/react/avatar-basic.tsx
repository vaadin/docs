import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout';

function Example() {
  const [person, setPerson] = useState<Person | undefined>(undefined);
  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => setPerson(people[0]));
  }, []);

  return (
    <>
      <HorizontalLayout theme="spacing">
        {/* tag::snippet[] */}
        <Avatar />

        <Avatar name={`${person?.firstName} ${person?.lastName}`} />

        <Avatar img={person?.pictureUrl} name={`${person?.firstName} ${person?.lastName}`} />
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
