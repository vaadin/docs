import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import MasterContent from './master-content';
import DetailContent from './detail-content';

function Example() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarWidthPercentage = sidebarCollapsed ? 13 : 40;

  return (
    <SplitLayout style={{ maxHeight: '280px' }}>
      <div style={{ overflow: 'hidden', width: `${sidebarWidthPercentage}%` }}>
        <Button
          theme="icon tertiary"
          aria-label="Expand/collapse sidebar"
          onClick={toggleSidebar}
          style={{ float: 'right' }}
        >
          <Icon icon={sidebarCollapsed ? 'vaadin:arrow-right' : 'vaadin:arrow-left'} />
        </Button>
        <MasterContent />
      </div>
      <div style={{ width: `${100 - sidebarWidthPercentage}%` }}>
        <DetailContent />
      </div>
    </SplitLayout>
  );
}

export default reactExample(Example); // hidden-source-line
