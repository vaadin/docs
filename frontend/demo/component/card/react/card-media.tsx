import '@vaadin/vaadin-lumo-styles/icons.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Card } from '@vaadin/react-components/Card.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import img from '../../../../../src/main/resources/images/lapland.avif?url';

function Example() {
  return (
    // tag::snippet[]
    <>
      <Card>
        <img slot="media" width="100" src={img} alt="" />
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>

      <Card>
        <Icon slot="media" icon="lumo:photo" />
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>

      <Card>
        <Avatar slot="media" name="Lapland" />
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>
    </>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
