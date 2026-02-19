import '@vaadin/vaadin-lumo-styles/icons.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Card } from '@vaadin/react-components/Card.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import img from '../../../../../src/main/resources/images/lapland.avif?url';

function Example() {
  return (
    <div className="card-grid">
      {/* tag::snippet[] */}
      {/* tag::[] */}
      <Card theme="cover-media">
        {/* end::[] */}
        <img slot="media" width="200" src={img} alt="" />
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>

      {/* tag::[] */}
      <Card theme="cover-media">
        {/* end::[] */}
        <Icon slot="media" icon="lumo:photo" style={{ background: 'rgba(0, 0, 0, 0.2)' }} />
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>
      {/* end::snippet[] */}

      <style>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1em;
        }
      `}</style>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
