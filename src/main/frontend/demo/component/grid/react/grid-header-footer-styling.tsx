import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
interface PersonWithRating extends Person {
  customerRating: number;
}

const ratingFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ratingRenderer = ({ item: person }: { item: PersonWithRating }) => (
  <span>{ratingFormatter.format(person.customerRating)}</span>
);

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<PersonWithRating[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => {
      const peopleWithRating = people.map((person) => ({
        ...person,
        customerRating: Math.random() * 10,
      }));
      items.value = peopleWithRating;
    });
  }, []);

  return (
    <Grid items={items.value} className="styling-header-footer">
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="profession" />
      <GridColumn
        header="Customer rating (0-10)"
        header-part-name="rating-header"
        footer-part-name="rating-footer"
        renderer={ratingRenderer}
        footer={<span>Avg rating: 5.32</span>}
      />
    </Grid>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
