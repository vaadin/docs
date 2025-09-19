import { createBrowserRouter, type RouteObject } from 'react-router';
import { protectRoutes } from '@vaadin/hilla-react-auth';
import AboutView from './AboutView';
import LoginView from './LoginView';
import MainLayout from './MainLayout';

// tag::snippet[]
export const routes: RouteObject[] = protectRoutes([
  {
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '/', element: <AboutView />, handle: { title: 'About', requiresLogin: true } },
    ],
  },
  { path: '/login', element: <LoginView /> },
]);

export default createBrowserRouter(routes);
// end::snippet[]
