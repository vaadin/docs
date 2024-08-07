import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Avatar, HorizontalLayout, Popover, VerticalLayout } from '@vaadin/react-components';
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
        <Avatar
          id="avatar"
          img={pictureUrl}
          name={`${firstName} ${lastName}`}
          style={{ margin: 'var(--lumo-space-s)', marginInlineStart: 'auto' }}
        />
      </HorizontalLayout>
      {/* tag::snippet[] */}
      <Popover
        for="avatar"
        position="bottom-end"
        overlayRole="menu"
        modal
        accessibleName="User menu"
      >
        <HorizontalLayout
          theme="spacing"
          style={{
            background: 'var(--lumo-contrast-5pct)',
            padding: 'var(--lumo-space-s)',
            margin: 'calc(var(--lumo-space-s) * -1)',
          }}
        >
          <Avatar
            img={pictureUrl}
            name={`${firstName} ${lastName}`}
            style={{ alignSelf: 'center' }}
          />
          <VerticalLayout style={{ marginTop: 'var(--lumo-space-s)' }}>
            <div style={{ fontWeight: 'bold', lineHeight: 1 }}>
              {firstName} {lastName}
            </div>
            <div>{nickName}</div>
          </VerticalLayout>
        </HorizontalLayout>
        <VerticalLayout style={{ marginTop: 'var(--lumo-space-s)', alignItems: 'stretch' }}>
          <a
            href="#"
            role="menuitem"
            style={{ padding: 'var(--lumo-space-xs)', textDecoration: 'none' }}
          >
            User profile
          </a>
          <a
            href="#"
            role="menuitem"
            style={{ padding: 'var(--lumo-space-xs)', textDecoration: 'none' }}
          >
            Preferences
          </a>
          <a
            href="#"
            role="menuitem"
            style={{ padding: 'var(--lumo-space-xs)', textDecoration: 'none' }}
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
