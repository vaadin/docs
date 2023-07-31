import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Item } from '@hilla/react-components/Item.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ListBox selected="0">
        <Item>In progress (2)</Item>
        <Item>Done (4)</Item>
        <Item disabled>Cancelled (0)</Item>
      </ListBox>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
