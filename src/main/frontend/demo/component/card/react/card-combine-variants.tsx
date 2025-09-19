import '@vaadin/vaadin-lumo-styles/icons.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Card } from '@vaadin/react-components/Card.js';
import img from '../../../../../src/main/resources/images/lapland.avif?url';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* tag::[] */}
      <Card theme="outlined elevated horizontal cover-media">
        {/* end::[] */}
        <img slot="media" width="200" src={img} alt="" />
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
