import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
// tag::snippet[]
import { Button, Notification } from '@vaadin/react-components';

function Example() {
  function sayHello() {
    Notification.show('Hello');
  }

  return <Button onClick={sayHello}>Say hello</Button>;
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
