import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Typography } from '@hilla/react-components/Typography.js';
import { Notification } from '@hilla/react-components/Notification.js';
import { Map } from '@hilla/react-components/Map.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Typography variant="h4">Where we are</Typography>
      <Map apiKey="YOUR_API_KEY" latitude={51.5074} longitude={0.1278} zoomLevel={12} />

      <Typography variant="h4">Notifications</Typography>
      <Notification
        position="middle"
        duration={3000}
        theme="info"
        onClose={() => console.log('Notification closed.')}
        // Commenting out unreachable setValue function
        // setValue={() => console.log('Value has changed')}
      >
        Hello, World!
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
