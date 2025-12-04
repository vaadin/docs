import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { SplitLayout } from '@vaadin/react-components/SplitLayout.js';
import DetailContent from './detail-content';
import MasterContent from './master-content';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const sidebarCollapsed = useSignal(false);

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const sidebarWidthPercentage = sidebarCollapsed.value ? 13 : 40;

  return (
    <SplitLayout style={{ maxHeight: '280px' }}>
      <div
        style={{
          overflow: 'hidden',
          width: `${sidebarWidthPercentage}%`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          theme="icon tertiary"
          aria-label="Expand/collapse sidebar"
          onClick={toggleSidebar}
          style={{ alignSelf: 'flex-end' }}
        >
          <Icon icon={sidebarCollapsed.value ? 'vaadin:arrow-right' : 'vaadin:arrow-left'} />
        </Button>
        <MasterContent />
      </div>

      <div style={{ width: `${100 - sidebarWidthPercentage}%` }}>
        <DetailContent />
      </div>
    </SplitLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
