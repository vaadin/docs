import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';
import { getCards } from 'Frontend/demo/domain/DataService';
import type Card from 'Frontend/generated/com/vaadin/demo/domain/Card';

function Example() {
  useSignals(); // hidden-source-line
  const value = useSignal<string>('');
  const items = useSignal<Card[]>([]);

  useEffect(() => {
    getCards().then((cards) => {
      items.value = cards;
      value.value = String(cards[0].id);
    });
  }, []);

  return (
    // tag::snippet[]
    <RadioGroup
      label="Payment method"
      theme="vertical"
      value={value.value}
      onValueChanged={(event) => {
        value.value = event.detail.value;
      }}
    >
      {items.value.map((card) => (
        <RadioButton value={String(card.id)} key={card.id}>
          <label slot="label">
            <HorizontalLayout theme="spacing">
              <img src={card.pictureUrl} alt={card.name} style={{ height: '1em' }} />
              <span>{card.accountNumber}</span>
            </HorizontalLayout>
            <div>Expiry date:{card.expiryDate}</div>
          </label>
        </RadioButton>
      ))}
    </RadioGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
