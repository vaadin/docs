import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Accordion } from '@hilla/react-components/Accordion.js';
import { AccordionPanel as _AccordionPanel } from '@hilla/react-components/AccordionPanel.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

// TODO: Remove this temporary workaround for https://github.com/vaadin/react-components/issues/119
const AccordionPanel = _AccordionPanel as any;

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Accordion>
        <AccordionPanel summary="Personal information">
          <VerticalLayout>
            <span>Sophia Williams</span>
            <span>sophia.williams@company.com</span>
            <span>(501) 555-9128</span>
          </VerticalLayout>
        </AccordionPanel>
        {/* end::snippet[] */}

        <AccordionPanel summary="Billing address">
          <VerticalLayout>
            <span>4027 Amber Lake Canyon</span>
            <span>72333-5884 Cozy Nook</span>
            <span>Arkansas</span>
          </VerticalLayout>
        </AccordionPanel>

        <AccordionPanel summary="Payment">
          <VerticalLayout>
            <span>MasterCard</span>
            <span>1234 5678 9012 3456</span>
            <span>Expires 06/21</span>
          </VerticalLayout>
        </AccordionPanel>
        {/* tag::snippet[] */}
      </Accordion>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
