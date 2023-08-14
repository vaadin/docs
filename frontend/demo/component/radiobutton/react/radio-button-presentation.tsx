import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { getCards } from 'Frontend/demo/domain/DataService';
import type Card from 'Frontend/generated/com/vaadin/demo/domain/Card';

function Example() {
  const [value, setValue] = useState<string>();
  const [items, setItems] = useState<Card[]>([]);

  useEffect(() => {
    getCards().then((cards) => {
      setItems(cards);
      setValue(String(cards[0].id));
    });
  }, []);

  return (
    // tag::snippet[]
    <RadioGroup
      label="Payment method"
      theme="vertical"
      value={value}
      onValueChanged={(event) => setValue(event.detail.value)}
    >
      {items.map((card) => (
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
