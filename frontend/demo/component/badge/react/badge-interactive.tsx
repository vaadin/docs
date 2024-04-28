import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { ComboBox, type ComboBoxChangeEvent } from '@vaadin/react-components/ComboBox.js';
import { Button, type ButtonElement } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';

import { getPeople } from 'Frontend/demo/domain/DataService';

type Profession = string;

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Profession[]>([]);
  const selectedProfessions = useSignal<Profession[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      const professions = [...new Set(people.map(({ profession }) => profession))];
      items.value = professions;
    });
  }, []);

  const onChange = (event: ComboBoxChangeEvent<Profession>) => {
    const { value } = event.target;

    if (value) {
      if (!selectedProfessions.value.includes(value)) {
        selectedProfessions.value = [...selectedProfessions.value, value];
      }
    }
  };

  const onClick = (event: React.MouseEvent<ButtonElement>) => {
    const profession = event.currentTarget.dataset.profession;

    if (profession) {
      selectedProfessions.value = selectedProfessions.value.filter((p) => p !== profession);
    }
  };

  // tag::snippet[]
  return (
    <VerticalLayout theme="spacing">
      <ComboBox label="Profession" items={items.value} onChange={onChange} />

      <HorizontalLayout style={{ flexWrap: 'wrap' }} theme="spacing">
        {selectedProfessions.value.map((profession) => (
          <span key={profession} {...{ theme: 'badge pill contrast' }}>
            <span>{profession}</span>
            <Button
              aria-label={`Clear filter: ${profession}`}
              data-profession={profession}
              theme="contrast tertiary-inline"
              title={`Clear filter: ${profession}`}
              style={{ marginInlineStart: 'var(--lumo-space-xs)' }}
              onClick={onClick}
            >
              <Icon icon="vaadin:close-small" />
            </Button>
          </span>
        ))}
      </HorizontalLayout>
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
