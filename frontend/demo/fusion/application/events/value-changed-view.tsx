import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
// tag::snippet[]
import React, { useState } from 'react';
import { TextField, type TextFieldValueChangedEvent } from '@vaadin/react-components';

function Example() {
  const [name, setName] = useState('');

  function nameChanged(event: TextFieldValueChangedEvent) {
    setName(event.detail.value);
  }

  return (
    <>
      <TextField label="Your name" onValueChanged={nameChanged} />
      <div>Your name is: {name}</div>
    </>
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
