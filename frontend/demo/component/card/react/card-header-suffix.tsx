import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Card } from '@vaadin/react-components/Card.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Card>
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        {/* tag::[] */}
        <span slot="header-suffix" {...{ theme: 'badge success' }}>
          Arctic
        </span>
        {/* end::[] */}
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>
      {/* end::snippet[] */}

      <style>{`
        vaadin-card {
          max-width: 300px;
        }
      `}</style>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
