import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { Scroller } from '@hilla/react-components/Scroller.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  return (
    <>
      <section id="container">
        <h2>Create new...</h2>
        {/* tag::snippet[] */}
        <Scroller scroll-direction="horizontal">
          <HorizontalLayout style={{ display: 'inline-flex' }} theme="padding spacing">
            <Button style={{ height: '100px' }}>
              <Icon icon="vaadin:clipboard-check" slot="prefix"></Icon>
              Audit
            </Button>
            <Button style={{ height: '100px' }}>
              <Icon icon="vaadin:book-dollar" slot="prefix"></Icon>
              Report
            </Button>
            <Button style={{ height: '100px' }}>
              <Icon icon="vaadin:line-chart" slot="prefix"></Icon>
              Dashboard
            </Button>
            <Button style={{ height: '100px' }}>
              <Icon icon="vaadin:invoice" slot="prefix"></Icon>
              Invoice
            </Button>
          </HorizontalLayout>
        </Scroller>
        {/* end::snippet[] */}
      </section>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
