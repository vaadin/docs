import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import exampleStyles from './notification-position-example-styles'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification.js';
import type { NotificationPosition } from '@hilla/react-components/Notification';

function Example() {
  const show = (position: NotificationPosition) => {
    Notification.show(position, { position });
  };

  return (
    <div className="notification-position-example">
      {/* tag::snippet[] */}
      <Button onClick={() => show('top-stretch')}>top-stretch</Button>
      <Button onClick={() => show('top-start')}>top-start</Button>
      <Button onClick={() => show('top-center')}>top-center</Button>
      <Button onClick={() => show('top-end')}>top-end</Button>
      <Button onClick={() => show('middle')}>middle</Button>
      <Button onClick={() => show('bottom-start')}>bottom-start</Button>
      <Button onClick={() => show('bottom-center')}>bottom-center</Button>
      <Button onClick={() => show('bottom-end')}>bottom-end</Button>
      <Button onClick={() => show('bottom-stretch')}>bottom-stretch</Button>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
