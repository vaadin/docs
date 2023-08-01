import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { ComboBox, type ComboBoxChangeEvent } from '@hilla/react-components/ComboBox.js';
import { Button, type ButtonElement } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';

import { getPeople } from 'Frontend/demo/domain/DataService';

type Profession = string;

function Example() {
  const [items, setItems] = useState<Profession[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<Profession[]>([]);

  useEffect(() => {
    getPeople().then(({ people }) => {
      const professions = [...new Set(people.map(({ profession }) => profession))];
      setItems(professions);
    });
  }, []);

  const onChange = (event: ComboBoxChangeEvent<Profession>) => {
    const { value } = event.target;

    if (value) {
      if (!selectedProfessions.includes(value)) {
        setSelectedProfessions([...selectedProfessions, value]);
      }
    }
  };

  const onClick = (event: React.MouseEvent<ButtonElement>) => {
    const profession = event.currentTarget.dataset.profession;

    if (profession) {
      setSelectedProfessions(selectedProfessions.filter((p) => p !== profession));
    }
  };

  return (
    <VerticalLayout theme="spacing">
      <ComboBox label="Profession" items={items} onChange={onChange} />

      <HorizontalLayout style={{ flexWrap: 'wrap' }} theme="spacing">
        {selectedProfessions.map((profession) => (
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
}

export default reactExample(Example); // hidden-source-line
