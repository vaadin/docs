import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';

function Example() {
  // tag::snippet[]
  const items = ['Apple', 'Banana', 'Orange', 'Pear'];

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

  return <ComboBox label="Fruit" items={items} itemClassNameGenerator={classNameGenerator} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
