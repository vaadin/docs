import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';

const sectionStyle = {
  border: 'solid 1px var(--vaadin-border-color)',
  width: '360px',
  maxWidth: '100%',
};

function Example() {
  return (
    <section id="container" style={sectionStyle}>
      <h2 style={{ padding: '1rem 1rem 0', fontSize: '1.375rem' }}>Create new...</h2>
      {/* tag::snippet[] */}
      <Scroller scroll-direction="horizontal">
        <HorizontalLayout style={{ display: 'inline-flex' }} theme="padding spacing">
          <Button style={{ height: '100px' }}>
            <Icon icon="vaadin:clipboard-check" slot="prefix" />
            Audit
          </Button>
          <Button style={{ height: '100px' }}>
            <Icon icon="vaadin:book-dollar" slot="prefix" />
            Report
          </Button>
          <Button style={{ height: '100px' }}>
            <Icon icon="vaadin:line-chart" slot="prefix" />
            Dashboard
          </Button>
          <Button style={{ height: '100px' }}>
            <Icon icon="vaadin:invoice" slot="prefix" />
            Invoice
          </Button>
        </HorizontalLayout>
      </Scroller>
      {/* end::snippet[] */}
    </section>
  );
}

export default reactExample(Example); // hidden-source-line
