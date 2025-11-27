import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Accordion, AccordionPanel, VerticalLayout } from '@vaadin/react-components';

const anchorStyle: React.CSSProperties = {
  color: 'var(--aura-blue-text)',
};

function Example() {
  return (
    // tag::snippet[]
    <Accordion>
      <AccordionPanel summary="Analytics">
        <VerticalLayout>
          <a href="#" style={anchorStyle}>
            Dashboard
          </a>
          <a href="#" style={anchorStyle}>
            Reports
          </a>
          <a href="#" style={anchorStyle}>
            Data sources
          </a>
        </VerticalLayout>
      </AccordionPanel>

      <AccordionPanel summary="Customers">
        <VerticalLayout>
          <a href="#" style={anchorStyle}>
            Accounts
          </a>
          <a href="#" style={anchorStyle}>
            Contacts
          </a>
        </VerticalLayout>
      </AccordionPanel>

      <AccordionPanel summary="Finances">
        <VerticalLayout>
          <a href="#" style={anchorStyle}>
            Invoices
          </a>
          <a href="#" style={anchorStyle}>
            Transactions
          </a>
          <a href="#" style={anchorStyle}>
            Statements
          </a>
        </VerticalLayout>
      </AccordionPanel>
    </Accordion>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
