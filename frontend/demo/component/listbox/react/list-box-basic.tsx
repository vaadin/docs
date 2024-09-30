import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';

function Example() {
  return (
    // tag::snippet[]
    <ListBox multiple selectedValues={[0, 2]}>
      <Item>Show assignee</Item>
      <Item>Show due date</Item>
      <Item>Show status</Item>
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
