import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MasterDetailLayout, SplitLayout } from '@vaadin/react-components';
import PersonDetail from 'Frontend/demo/component/master-detail-layout/react/PersonDetail';
import PersonList from 'Frontend/demo/component/master-detail-layout/react/PersonList';
import { masterDetailLayoutExample } from 'Frontend/demo/component/master-detail-layout/react/wrapper'; // hidden-source-line
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
    <SplitLayout orientation="vertical" style={{ height: '100%' }}>
      {/* tag::snippet[] */}
      <MasterDetailLayout
        orientation="vertical"
        masterMinSize="400px"
        detailSize="250px"
        stackThreshold="400px"
      >
        {/* end::snippet[] */}
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
          {selectedPerson.value ? (
            <PersonDetail
              person={selectedPerson.value}
              onClose={() => {
                selectedPerson.value = null;
              }}
            />
          ) : null}
        </MasterDetailLayout.Detail>
        {/* tag::snippet[] */}
      </MasterDetailLayout>
      {/* end::snippet[] */}
      <div style={{ flex: '0', backgroundColor: 'var(--lumo-contrast-20pct)' }}></div>
    </SplitLayout>
  );
}

export default masterDetailLayoutExample(Example); // hidden-source-line
