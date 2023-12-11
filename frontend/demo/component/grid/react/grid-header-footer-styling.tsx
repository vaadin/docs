import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

// tag::snippet[]
interface PersonWithRating extends Person {
  customerRating: number;
}

const ratingFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ratingRenderer = (person: PersonWithRating) => (
  <span>${ratingFormatter.format(person.customerRating)}</span>
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
    <Grid items={items} className="styling-header-footer">
      <GridColumn path="firstName" header-part-name="header-bold"/>
      <GridColumn path="lastName" header-part-name="header-bold"/>
      <GridColumn path="profession" header-part-name="header-bold"/>
      <GridColumn
        header="Customer rating (0-10)"
        header-part-name="header-bold"
        footer-part-name="footer-light-green"
        footerRenderer={() => <span>Avg rating: 5.32</span>}
      >{({ item }) => ratingRenderer(item)}</GridColumn>
    </Grid>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
