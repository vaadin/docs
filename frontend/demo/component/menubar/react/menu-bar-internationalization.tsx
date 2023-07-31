import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar, MenuItem } from '@hilla/react-components/MenuBar.js';

function Example() {
  const items = [
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [
        {
          text: 'On social media',
          children: [
            <MenuItem text="Facebook" />,
            <MenuItem text="Twitter" />,
            <MenuItem text="Instagram" />,
          ],
        },
        <MenuItem text="By email" />,
        <MenuItem text="Get link" />,
      ],
    },
    {
      text: 'Move',
      children: [<MenuItem text="To folder" />, <MenuItem text="To trash" />],
    },
    { text: 'Duplicate' },
  ];

  const customI18n = {
    moreOptions: 'More actions',
  };

  return (
    <>
      <MenuBar i18n={customI18n}>
        {items.map((item) => {
          if (Array.isArray(item.children)) {
            return (
              <MenuItem text={item.text}>
                {item.children.map((child) => (
                  <MenuItem text={child.text}>{child.children}</MenuItem>
                ))}
              </MenuItem>
            );
          } else {
            return <MenuItem text={item.text} />;
          }
        })}
      </MenuBar>
    </>
  );
}

export default reactExample(Example);
