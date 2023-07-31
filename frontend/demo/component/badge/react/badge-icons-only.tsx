import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Icon } from '@hilla/react-components/Icon.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <>
      <HorizontalLayout theme="spacing">
        {/* tag::snippet[] */}
        <Icon
          aria-label="Confirmed"
          icon="vaadin:check"
          style={{ padding: 'var(--lumo-space-xs)' }}
          {...({
            theme: 'badge success',
            title: 'Confirmed',
          } as any)}
        />

        <Icon
          aria-label="Cancelled"
          icon="vaadin:close-small"
          style={{ padding: 'var(--lumo-space-xs)' }}
          {...({
            theme: 'badge error',
            title: 'Cancelled',
          } as any)}
        />
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example);
