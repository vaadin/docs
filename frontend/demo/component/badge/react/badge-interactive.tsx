import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Badge,
  Button,
  type ButtonElement,
  ComboBox,
  type ComboBoxChangeEvent,
  HorizontalLayout,
  Icon,
  VerticalLayout,
} from '@vaadin/react-components';
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
    const { profession } = event.currentTarget.dataset;

    if (profession) {
      selectedProfessions.value = selectedProfessions.value.filter((p) => p !== profession);
    }
  };

  // tag::snippet[]
  return (
    <VerticalLayout theme="spacing">
      <ComboBox label="Profession" items={items.value} onChange={onChange} />

      <HorizontalLayout theme="spacing wrap">
        {selectedProfessions.value.map((profession) => (
          <Badge key={profession} style={{ paddingRight: '0' }}>
            <span>{profession}</span>
            <Button
              aria-label={`Clear filter: ${profession}`}
              data-profession={profession}
              theme="tertiary"
              title={`Clear filter: ${profession}`}
              style={{ height: '1.5rem', minWidth: '1.5rem', margin: '0', padding: '0' }}
              onClick={onClick}
            >
              <Icon icon="vaadin:close-small" />
            </Button>
          </Badge>
        ))}
      </HorizontalLayout>
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
