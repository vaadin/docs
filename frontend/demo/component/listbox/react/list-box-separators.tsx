import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Item } from '@vaadin/react-components/Item.js';
import { ListBox } from '@vaadin/react-components/ListBox.js';

function Example() {
  return (
    // tag::snippet[]
    <ListBox multiple selectedValues={[0, 2, 3]}>
      <Item>Show assignee</Item>
      <Item>Show due date</Item>
      <Item>Show status</Item>
      <hr />
      <Item>Show thumbnail</Item>
      <Item>Show preview</Item>
    </ListBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
