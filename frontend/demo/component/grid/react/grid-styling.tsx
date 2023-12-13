import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid, type GridCellPartNameGenerator } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

// tag::snippet[]
interface PersonWithRating extends Person {
  customerRating: number;
}

const cellPartNameGenerator: GridCellPartNameGenerator<PersonWithRating> = (column, model) => {
  const item = model.item;
  let parts = '';
  // Make the customer rating column bold
  if (column.header?.startsWith('Customer rating')) {
    parts += ' font-weight-bold';
  }
  // Add high-rating part to customer ratings of 8 or higher
  if (item.customerRating >= 8.0) {
    parts += ' high-rating';
    // Add low-rating part to customer ratings of 4 or lower
  } else if (item.customerRating <= 4.0) {
    parts += ' low-rating';
  }
  return parts;
};

const ratingFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ratingRenderer = (person: PersonWithRating) => (
  <span>{ratingFormatter.format(person.customerRating)}</span>
);

function Example() {
  const [items, setItems] = useState<PersonWithRating[]>([]);
  useEffect(() => {
    getPeople().then(({ people }) => {
      const peopleWithRating = people.map((person) => ({
        ...person,
        customerRating: Math.random() * 10,
      }));
      setItems(peopleWithRating);
    });
  }, []);

  return (
    <Grid items={items} cellPartNameGenerator={cellPartNameGenerator} className="styling">
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="profession" />
      <GridColumn header="Customer rating (0-10)">{({ item }) => ratingRenderer(item)}</GridColumn>
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
