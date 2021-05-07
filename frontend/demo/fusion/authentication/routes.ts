import { Route, Router } from '@vaadin/router';
import { isUserInRole } from './auth';

// Enable declaring additional data on the routes
// tag::ViewRoute[]
export type ViewRoute = Route & {
  title?: string;
  children?: ViewRoute[];
  rolesAllowed?: string[];
};
// end::ViewRoute[]

// tag::isAuthorizedViewRoute[]
export function isAuthorizedViewRoute(route: ViewRoute) {
  if (route.rolesAllowed) {
    return route.rolesAllowed.find((role) => isUserInRole(role));
  }

  return true;
}
// end::isAuthorizedViewRoute[]

// tag::routes[]
export const routes: ViewRoute[] = [
  {
    path: 'protected',
    component: 'protected-view',
    title: 'Protected',
    rolesAllowed: ['ADMIN'],
    action: async (context, commands: Router.Commands) => {
      const route = context.route as ViewRoute;
      if (!isAuthorizedViewRoute(route)) {
        return commands.prevent();
      }
      await import('./protected-view');
      return undefined;
    },
  },
];
// end::routes[]
