import '../master-detail-layout-full-height.js'; // hidden-source-line
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  EmailField,
  FormLayout,
  Grid,
  GridColumn,
  MasterDetailLayout,
  SplitLayout,
  TextField,
} from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const people = useSignal<Person[]>([]);
  const professions = useSignal<string[]>([]);
  const selectedProfession = useSignal<string | null>(null);
  const selectedPerson = useSignal<Person | null>(null);
  const hasInitialData = useSignal(false);

  const persons = useComputed(() => {
    const profession = selectedProfession.value;
    if (profession == null) {
      return [];
    }
    return people.value.filter((p) => p.profession === profession);
  });

  useEffect(() => {
    getPeople().then(({ people: allPeople }) => {
      people.value = allPeople;
      professions.value = [...new Set(allPeople.map((p) => p.profession))].toSorted().slice(0, 4);
      selectedProfession.value = professions.value[0];
      hasInitialData.value = true;
    });
  }, []);

  // For the outer MDL, details can only be rendered after initial data has been loaded. The details
  // being rendered later than the root component results in an animation for what is practically
  // the initial rendering of the component. As a workaround, render the whole MDL only after the
  // initial data has been loaded.
  return hasInitialData.value ? (
    <SplitLayout style={{ height: '100%' }}>
      {/* tag::snippet[] */}
      <MasterDetailLayout
        masterSize="300px"
        expandDetail
        onBackdropClick={() => {
          selectedProfession.value = null;
        }}
        onDetailEscapePress={() => {
          selectedProfession.value = null;
        }}
      >
        <MasterDetailLayout.Master>
          <Grid
            items={professions.value}
            selectedItems={selectedProfession.value ? [selectedProfession.value] : []}
            onActiveItemChanged={(e) => {
              selectedProfession.value = e.detail.value ?? null;
              selectedPerson.value = null;
            }}
            theme="no-border"
            style={{ height: '100%' }}
          >
            <GridColumn header="Profession">{({ item }) => <>{item}</>}</GridColumn>
          </Grid>
        </MasterDetailLayout.Master>
        <MasterDetailLayout.Detail>
          {selectedProfession.value ? (
            <MasterDetailLayout
              masterSize="500px"
              expandDetail
              onBackdropClick={() => {
                selectedPerson.value = null;
              }}
              onDetailEscapePress={() => {
                selectedPerson.value = null;
              }}
            >
              <MasterDetailLayout.Master>
                <Grid
                  items={persons.value}
                  selectedItems={selectedPerson.value ? [selectedPerson.value] : []}
                  onActiveItemChanged={(e) => {
                    selectedPerson.value = e.detail.value ?? null;
                  }}
                  theme="no-border"
                  style={{ height: '100%' }}
                >
                  <GridColumn path="firstName" />
                  <GridColumn path="lastName" />
                  <GridColumn path="email" />
                </Grid>
              </MasterDetailLayout.Master>
              <MasterDetailLayout.Detail>
                {selectedPerson.value ? (
                  <FormLayout autoResponsive style={{ paddingInline: 'var(--vaadin-gap-m)' }}>
                    <TextField label="First Name" value={selectedPerson.value.firstName} readonly />
                    <TextField label="Last Name" value={selectedPerson.value.lastName} readonly />
                    <EmailField label="Email" value={selectedPerson.value.email} readonly />
                    <Button
                      onClick={() => {
                        selectedPerson.value = null;
                      }}
                    >
                      Close
                    </Button>
                  </FormLayout>
                ) : null}
              </MasterDetailLayout.Detail>
            </MasterDetailLayout>
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
  ) : null;
}

export default reactExample(Example); // hidden-source-line
