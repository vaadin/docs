import { protectRoutes } from '@hilla/react-auth';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from './MainLayout';
import LoginView from './LoginView';
import AboutView from './AboutView';

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
