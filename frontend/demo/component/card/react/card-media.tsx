import '@vaadin/vaadin-lumo-styles/icons.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Card } from '@vaadin/react-components/Card.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import img from '../../../../../src/main/resources/images/lapland.avif?url';

function Example() {
  return (
    <div className="card-grid">
      {/* tag::snippet[] */}
      <Card>
        {/* tag::[] */}
        <img slot="media" width="100" src={img} alt="" />
        {/* end::[] */}
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>

      <Card>
        {/* tag::[] */}
        <Icon slot="media" icon="lumo:photo" />
        {/* end::[] */}
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>

      <Card>
        {/* tag::[] */}
        <Avatar slot="media" name="Lapland" />
        {/* end::[] */}
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>
      {/* end::snippet[] */}

      <style>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 1em;
        }
      `}</style>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
