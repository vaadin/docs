import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { MenuItem } from '@hilla/react-components/MenuItem.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  const items = [
    {
      component: (
        <MenuItem>
          <Icon icon="vaadin:share" />
          Share
        </MenuItem>
      ),
      children: [
        {
          component: (
            <MenuItem>
              <Icon
                icon="vaadin:share"
                style={{
                  width: 'var(--lumo-icon-size-s)',
                  height: 'var(--lumo-icon-size-s)',
                  marginRight: 'var(--lumo-space-s)',
                }}
              />
              By email
            </MenuItem>
          ),
        },
        {
          component: (
            <MenuItem>
              <Icon
                icon="vaadin:link"
                style={{
                  width: 'var(--lumo-icon-size-s)',
                  height: 'var(--lumo-icon-size-s)',
                  marginRight: 'var(--lumo-space-s)',
                }}
              />
              Get link
            </MenuItem>
          ),
        },
      ],
    },
    {
      component: (
        <MenuItem>
          <Icon icon="vaadin:copy" aria-label="duplicate" />
        </MenuItem>
      ),
    },
  ];

  return (
    <>
      {/* tag::snippethtml[] */}
      <MenuBar theme="icon" items={items} />
      {/* end::snippethtml[] */}
    </>
  );
}

export default reactExample(Example);
