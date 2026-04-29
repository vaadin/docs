import '../master-detail-layout-full-height.js'; // hidden-source-line
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MasterDetailLayout, SplitLayout } from '@vaadin/react-components';
import PersonDetail from 'Frontend/demo/component/master-detail-layout/react/PersonDetail';
import PersonList from 'Frontend/demo/component/master-detail-layout/react/PersonList';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Person[]>([]);
  const selectedPerson = useSignal<Person | null>(null);
  useEffect(() => {
    getPeople().then(({ people }) => {
      items.value = people;
    });
  }, []);

  return (
    <SplitLayout style={{ height: '100%' }}>
      {/* tag::snippet[] */}
      <MasterDetailLayout masterSize="450px" detailSize="250px" expandMaster>
        <MasterDetailLayout.Master>
          <PersonList
            people={items.value}
            selectedPerson={selectedPerson.value}
            onSelect={(person) => {
              selectedPerson.value = person;
            }}
          />
        </MasterDetailLayout.Master>
        <MasterDetailLayout.Detail>
          {/* The detail area is revealed when it's populated with a component,
              and hidden when the component is removed: */}
          {selectedPerson.value ? (
            <PersonDetail
              person={selectedPerson.value}
              onClose={() => {
                selectedPerson.value = null;
              }}
            />
          ) : null}
        </MasterDetailLayout.Detail>
      </MasterDetailLayout>
      {/* end::snippet[] */}
      <div
        style={{
          flex: '0 0 auto',
          minWidth: '1.75em',
          backgroundColor: 'var(--vaadin-background-container)',
          display: 'flex',
          textAlign: 'center',
        }}
      >
        <span
          style={{ textOrientation: 'sideways', writingMode: 'vertical-lr', fontWeight: 'bold' }}
        >
          Drag to resize
        </span>
      </div>
    </SplitLayout>
  );
}

export default reactExample(Example); // hidden-source-line
