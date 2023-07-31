import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ListBox multiple selectedValues={[0, 2]}>
        <Item>Show assignee</Item>
        <Item>Show due date</Item>
        <Item>Show status</Item>
      </ListBox>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
