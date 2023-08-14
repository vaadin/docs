import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';

function Example() {
  return (
    // tag::snippet[]
    <ListBox selected={0}>
      <Item>In progress</Item>
      <Item>Done</Item>
      <Item>Cancelled</Item>
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
