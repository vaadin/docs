import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { IntegerField, Popover } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  return (
    <>
      <IntegerField id="cvv-field" label="CVV" style={{ width: '60px' }} />
      <Popover
        for="cvv-field"
        position="top"
        trigger={['hover', 'focus']}
        aria-labelledby="cvv-heading"
        theme="arrow"
      >
        <h3 id="cvv-heading" style={{ margin: 0, fontSize: '1rem' }}>
          Card Verification Value
        </h3>
        <div style={{ maxWidth: '300px' }}>
          A three or four digit code, usually printed on the back of the card, next to, or at the
          end of, the signature strip.
        </div>
        <a href="https://www.cvvnumber.com/cvv.html" target="_blank">
          See where to find CVV on different cards
        </a>
      </Popover>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
