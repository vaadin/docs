import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Scroller } from '@vaadin/react-components/Scroller.js';

const sectionStyle = {
  width: '360px',
};

function Example() {
  return (
    <section className="border border-contrast-20 max-w-full" id="container" style={sectionStyle}>
      <h2 className="pt-m px-m text-xl">Create new...</h2>
      {/* tag::snippet[] */}
      <Scroller scroll-direction="horizontal">
        <HorizontalLayout className="inline-flex" theme="padding spacing">
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
