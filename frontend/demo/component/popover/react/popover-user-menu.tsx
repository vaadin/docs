import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Avatar,
  Button,
  HorizontalLayout,
  Popover,
  VerticalLayout,
} from '@vaadin/react-components';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

function Example() {
  useSignals(); // hidden-source-line
  const person = useSignal<Person | undefined>(undefined);

  useEffect(() => {
    getPeople({ count: 1 }).then(({ people }) => {
      person.value = people[0];
    });
  }, []);

  const { firstName, lastName, pictureUrl } = person.value ?? {};
  const nickName = `@${firstName}${lastName}`.toLowerCase();

  return (
    <>
      <HorizontalLayout style={{ background: 'var(--lumo-contrast-5pct)' }}>
        <Button
          id="avatar"
          theme="icon tertiary-inline"
          style={{ margin: 'var(--lumo-space-s)', marginInlineStart: 'auto', borderRadius: '50%' }}
        >
          <Avatar
            tabIndex={-1}
            style={{ display: 'block', cursor: 'pointer' }}
            img={pictureUrl}
            name={`${firstName} ${lastName}`}
          />
        </Button>
      </HorizontalLayout>
      {/* tag::snippet[] */}
      <Popover
        for="avatar"
        position="bottom-end"
        overlayRole="menu"
        modal
        accessibleName="User menu"
        theme='no-padding'
      >
        <HorizontalLayout
          style={{
            background: 'var(--lumo-contrast-5pct)',
            padding: 'var(--lumo-space-s)',
            paddingInlineEnd: 'var(--lumo-space-l)',
            margin: '2px',
            alignItems: 'center',
            gap: 'var(--lumo-space-s)'
          }}
        >
          <Avatar
            tabIndex={-1}
            img={pictureUrl}
            name={`${firstName} ${lastName}`}
            style={{ alignSelf: 'center' }}
            theme='large'
          />
          <VerticalLayout style={{ lineHeight: 'var(--lumo-line-height-s)' }}>
            <div style={{ fontWeight: 'bold'}}>
              {firstName} {lastName}
            </div>
            <div style={{ fontSize: 'var(--lumo-font-size-s)', color: 'var(--lumo-secondary-text-color)'}}>{nickName}</div>
          </VerticalLayout>
        </HorizontalLayout>
        <VerticalLayout style={{ paddingBottom: 'var(--lumo-space-xs)', alignItems: 'stretch', '--lumo-primary-text-color': 'var(--lumo-body-text-color)' }}>
          <a
            href="#"
            role="menuitem"
            style={{ padding: 'var(--lumo-space-xs) var(--lumo-space-m)'}}
          >
            User profile
          </a>
          <a
            href="#"
            role="menuitem"
            style={{ padding: 'var(--lumo-space-xs) var(--lumo-space-m)'}}
          >
            Preferences
          </a>
          <a
            href="#"
            role="menuitem"
            style={{ padding: 'var(--lumo-space-xs) var(--lumo-space-m)'}}
          >
            Sign out
          </a>
        </VerticalLayout>
      </Popover>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
