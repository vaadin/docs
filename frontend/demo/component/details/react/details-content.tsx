import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Details } from '@hilla/react-components/Details.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

const anchorStyle = {
  textDecoration: 'none',
  color: 'var(--lumo-primary-text-color)',
};

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Details summary="Analytics" opened>
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
      </Details>

      <Details summary="Customers" opened>
        <VerticalLayout>
          <a href="#" style={anchorStyle}>
            Accounts
          </a>
          <a href="#" style={anchorStyle}>
            Contacts
          </a>
        </VerticalLayout>
      </Details>

      <Details summary="Finances" opened>
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
      </Details>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
