import { NavLink, Outlet } from 'react-router';
import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { i18n } from '@vaadin/hilla-react-i18n';

// tag::configure[]
await i18n.configure();
// end::configure[]

// tag::layout[]
export default function MainLayout() {
  const viewTitle = useViewConfig()?.title;

  return (
    <>
      <header>{i18n.translateDynamic(viewTitle)}</header>
      <nav>
        {createMenuItems().map(({ to, title }) => (
          <NavLink to={to} key={to}>
            {i18n.translateDynamic(title)}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
}
// end::layout[]
