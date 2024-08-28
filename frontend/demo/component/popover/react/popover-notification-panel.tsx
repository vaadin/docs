import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import {
  Button,
  HorizontalLayout,
  Icon,
  MessageList,
  Popover,
  TabSheet,
  TabSheetTab,
  type MessageListItem,
} from '@vaadin/react-components';
import { format, subMinutes } from 'date-fns';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { getPeople } from 'Frontend/demo/domain/DataService';

function Example() {
  useSignals(); // hidden-source-line
  const unreadNotifications = useSignal<MessageListItem[]>([]);
  const allNotifications = useSignal<MessageListItem[]>([]);

  useEffect(() => {
    getPeople({ count: 4 }).then(({ people }) => {
      unreadNotifications.value = [
        {
          userName: `${people[0].firstName} ${people[0].lastName}`,
          userImg: people[0].pictureUrl,
          time: format(subMinutes(new Date(), 20), 'HH:mm'),
          text: 'Could you send me the latest TPS report from the ACME project?',
        },
        {
          userName: `${people[1].firstName} ${people[1].lastName}`,
          userImg: people[1].pictureUrl,
          time: format(subMinutes(new Date(), 30), 'HH:mm'),
          text: 'Hey, are we on track for the trade show next month?',
        },
        {
          userName: `${people[2].firstName} ${people[2].lastName}`,
          userImg: people[2].pictureUrl,
          time: format(subMinutes(new Date(), 35), 'HH:mm'),
          text: `TPS reports look good! I'm going to pass it on to Alliyah next.`,
        },
      ];

      allNotifications.value = [
        ...unreadNotifications.value,
        {
          userName: `${people[3].firstName} ${people[3].lastName}`,
          userImg: people[3].pictureUrl,
          time: format(subMinutes(new Date(), 55), 'HH:mm'),
          text: 'Hi, are you going to attend the brainstorming session tomorrow?',
        },
      ];
    });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Button id="show-notifications" aria-label="Notifications" theme="icon">
        <Icon icon="lumo:bell" />
      </Button>
      <Popover
        for="show-notifications"
        theme="arrow no-padding"
        modal
        position="bottom"
        contentWidth="300px"
        accessibleNameRef="notifications-heading"
      >
        <HorizontalLayout
          style={{ alignItems: 'baseline', padding: 'var(--lumo-space-s) var(--lumo-space-s) 0' }}
        >
          <h4 style={{ margin: 0 }} id="notifications-heading">
            Notifications
          </h4>
          <Button
            style={{ marginInlineStart: 'auto' }}
            onClick={() => {
              unreadNotifications.value = [];
            }}
          >
            Mark all read
          </Button>
        </HorizontalLayout>
        <TabSheet theme="no-padding">
          <TabSheetTab label="Unread">
            {unreadNotifications.value.length ? (
              <MessageList
                items={unreadNotifications.value}
                className="notifications"
              ></MessageList>
            ) : (
              'No new notifications'
            )}
          </TabSheetTab>
          <TabSheetTab label="All">
            <MessageList items={allNotifications.value} className="notifications"></MessageList>
          </TabSheetTab>
        </TabSheet>
      </Popover>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
