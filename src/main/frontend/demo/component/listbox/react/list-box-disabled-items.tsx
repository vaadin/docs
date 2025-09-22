import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';

function Example() {
  return (
    // tag::snippet[]
    <ListBox selected={0}>
      <Item>In progress (2)</Item>
      <Item>Done (4)</Item>
      <Item disabled>Cancelled (0)</Item>
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
