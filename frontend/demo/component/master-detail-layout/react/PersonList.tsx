import React from 'react';
import { Grid, GridColumn, VerticalLayout } from '@vaadin/react-components';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

interface PersonListProps {
  people: Person[];
  selectedPerson: Person | null;

  onSelect(person: Person | null): void;
}

function PersonList({ people, selectedPerson, onSelect }: PersonListProps) {
  return (
    <VerticalLayout theme="padding spacing" style={{ height: '100%' }}>
      <p>Select a person to view their details:</p>
      <Grid
        items={people}
        style={{ height: '100%' }}
        selectedItems={selectedPerson ? [selectedPerson] : []}
        onActiveItemChanged={(e) => {
          onSelect(e.detail.value ?? null);
        }}
      >
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        <GridColumn path="profession" />
      </Grid>
    </VerticalLayout>
  );
}

export default PersonList;
