import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';

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
