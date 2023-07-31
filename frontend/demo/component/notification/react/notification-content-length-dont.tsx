import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NotificationCard>
        <div>
          <div>New message from Aria Bailey</div>
          <div
            style={{
              fontSize: 'var(--lumo-font-size-s)',
              color: 'var(--lumo-secondary-text-color)',
            }}
          >
            Yeah, I know. But could you help me with this. I’m not sure where the bug is in my CSS?
            The checkmark doesn’t get the right color. I’m trying to use the CSS custom properties
            from our design system, but for some reason it’s not working.
          </div>
        </div>

        <Button theme="tertiary-inline">
          <Icon icon="lumo:cross" />
        </Button>
      </NotificationCard>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
