import { reactExample } from 'Frontend/demo/react-example';
import { SideNav, SideNavItem } from '@hilla/react-components/SideNav.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SideNav style={{ width: '100%' }}>
        <SideNavItem path="/inbox">
          <Icon icon="vaadin:envelope" slot="prefix" />
          Inbox
          <span {...{ theme: 'badge contrast pill' }} aria-label="12 unread messages" slot="suffix">
            12
          </span>
        </SideNavItem>
        <SideNavItem path="/calendar">
          <Icon icon="vaadin:calendar" slot="prefix" />
          Calendar
          <Icon
            icon="vaadin:bell"
            theme="badge error pill"
            style={{ padding: 'var(--lumo-space-xs)' }}
            aria-label="Upcoming appointment"
            slot="suffix"
          />
        </SideNavItem>
      </SideNav>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
