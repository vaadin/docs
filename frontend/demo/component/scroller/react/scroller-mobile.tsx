import '@vaadin/icons';
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

const sectionStyle = {
  border: '1px solid var(--lumo-contrast-20pct)',
  maxWidth: '100%',
  width: '360px',
};

const sectionH2Style = {
  marginLeft: 'var(--lumo-space-m)',
  marginRight: 'var(--lumo-space-m)',
};

function Example() {
  return (
    <section id="container" style={sectionStyle}>
      <h2 style={sectionH2Style}>Create new...</h2>
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
