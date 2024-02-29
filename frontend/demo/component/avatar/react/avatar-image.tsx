import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Avatar, HorizontalLayout } from '@vaadin/react-components';
import companyLogo from '../../../../../src/main/resources/images/company-logo.png';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => setPerson(people[0]));
  }, []);

  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Avatar img={person?.pictureUrl} name={`${person?.firstName} ${person?.lastName}`} />

      <Avatar img={companyLogo} name="Company Inc." />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
