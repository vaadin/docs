import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Details } from '@hilla/react-components/Details.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Details summary="Analytics" opened>
        <VerticalLayout>
          <a href="#">Dashboard</a>
          <a href="#">Reports</a>
          <a href="#">Data sources</a>
        </VerticalLayout>
      </Details>

      <Details summary="Customers" opened>
        <VerticalLayout>
          <a href="#">Accounts</a>
          <a href="#">Contacts</a>
        </VerticalLayout>
      </Details>

      <Details summary="Finances" opened>
        <VerticalLayout>
          <a href="#">Invoices</a>
          <a href="#">Transactions</a>
          <a href="#">Statements</a>
        </VerticalLayout>
      </Details>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
