import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Accordion } from '@hilla/react-components/Accordion.js';
import { AccordionPanel } from '@hilla/react-components/AccordionPanel.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Accordion>
        <AccordionPanel summary="Analytics">
          <VerticalLayout>
            <a href="#">Dashboard</a>
            <a href="#">Reports</a>
            <a href="#">Data sources</a>
          </VerticalLayout>
        </AccordionPanel>

        <AccordionPanel summary="Customers">
          <VerticalLayout>
            <a href="#">Accounts</a>
            <a href="#">Contacts</a>
          </VerticalLayout>
        </AccordionPanel>

        <AccordionPanel summary="Finances">
          <VerticalLayout>
            <a href="#">Invoices</a>
            <a href="#">Transactions</a>
            <a href="#">Statements</a>
          </VerticalLayout>
        </AccordionPanel>
      </Accordion>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
