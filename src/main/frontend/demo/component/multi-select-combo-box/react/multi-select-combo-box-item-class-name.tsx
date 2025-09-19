import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MultiSelectComboBox } from '@vaadin/react-components/MultiSelectComboBox.js';

function Example() {
  // tag::snippet[]
  const items = ['Apple', 'Banana', 'Orange', 'Pear'];
  const selectedItems = items.slice(0, 2);

  const classNameGenerator = (item: string) => {
    switch (item) {
      case 'Apple':
        return 'coral';
      case 'Banana':
        return 'gold';
      case 'Orange':
        return 'orange';
      case 'Pear':
        return 'yellowgreen';
      default:
        return '';
    }
  };

  return (
    <MultiSelectComboBox
      label="Fruit"
      items={items}
      selectedItems={selectedItems}
      style={{ width: '300px' }}
      itemClassNameGenerator={classNameGenerator}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
