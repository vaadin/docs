import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Icon } from '@hilla/react-components/Icon.js';
import {
  HorizontalLayout,
  type HorizontalLayoutElement,
} from '@hilla/react-components/HorizontalLayout.js';
import '@vaadin/icons';

function Example() {
  const layoutRef = useRef<HorizontalLayoutElement>(null);

  useEffect(() => {
    if (!layoutRef.current) {
      return;
    }
    // Workaround for https://github.com/vaadin/web-components/issues/6301
    const icons = layoutRef.current.querySelectorAll('vaadin-icon');
    icons.forEach((icon) => icon.setAttribute('icon', icon.icon ?? ''));
  });

  return (
    <>
      <HorizontalLayout theme="spacing" ref={layoutRef}>
        {/* tag::snippet[] */}
        <Icon
          aria-label="Confirmed"
          icon="vaadin:check"
          style={{ padding: 'var(--lumo-space-xs)' }}
          theme="badge success"
          title="Confirmed"
        />

        <Icon
          aria-label="Cancelled"
          icon="vaadin:close-small"
          style={{ padding: 'var(--lumo-space-xs)' }}
          theme="badge error"
          title="Cancelled"
        />
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
