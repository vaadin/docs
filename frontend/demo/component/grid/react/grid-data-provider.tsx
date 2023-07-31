React: import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridSortColumn } from '@hilla/react-components/GridSortColumn.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function matchesTerm(value, searchTerm) {
  return value.toLowerCase().includes(searchTerm.toLowerCase());
}

function compare(a, b, direction) {
  return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
}

async function fetchPeople(params) {
  const { page, pageSize, searchTerm, sortOrders } = params;
  const { people } = await getPeople();
  let result = people.map((person) => ({
    ...person,
    fullName: `${person.firstName} ${person.lastName}`,
  }));

  // Filtering
  if (searchTerm) {
    result = result.filter(
      (p) => matchesTerm(p.fullName, searchTerm) || matchesTerm(p.profession, searchTerm)
    );
  }

  // Sorting
  const sortBy = Object.fromEntries(sortOrders.map(({ path, direction }) => [path, direction]));
  if (sortBy.fullName) {
    result = result.sort((p1, p2) => compare(p1.fullName, p2.fullName, sortBy.fullName));
  } else if (sortBy.profession) {
    result = result.sort((p1, p2) => compare(p1.profession, p2.profession, sortBy.profession));
  }

  // Pagination
  const count = result.length;
  result = result.slice(page * pageSize, pageSize);

  return { people: result, count };
}

function Example() {
  const [searchTerm, setSearchTerm] = useState('');

  const dataProvider = async (params) => {
    const { page, pageSize, sortOrders } = params;

    const { people, count } = await fetchPeople({
      page,
      pageSize,
      sortOrders,
      searchTerm,
    });

    return { items: people, size: count };
  };

  return (
    <VerticalLayout theme="spacing">
      <TextField
        placeholder="Search"
        style={{ width: '50%' }}
        onValueChanged={(e) => {
          setSearchTerm(e.detail.value.trim());
        }}
      >
        <Icon slot="prefix" icon="vaadin:search" />
      </TextField>
      <Grid dataProvider={dataProvider}>
        <GridSortColumn path="fullName" header="Name" />
        <GridSortColumn path="profession" />
      </Grid>
    </VerticalLayout>
  );
}

export default reactExample(Example);
