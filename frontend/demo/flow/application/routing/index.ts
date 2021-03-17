// tag::snippet[]
import { Router } from '@vaadin/router';
import { Flow } from '@vaadin/flow-frontend';

// Get automatically generated routes to server-side views
const { serverSideRoutes } = new Flow({
  imports: () => import('../../../../../target/frontend/generated-flow-imports'),
});

export const router = new Router(document.querySelector('#outlet'));

// List all the application routes here
router.setRoutes([
  {
    path: 'routing-login',
    component: 'routing-login',
    action: async () => {
      await import('./routing-basic');
    },
  },
  {
    path: 'routing-registration',
    component: 'routing-registration',
    action: async () => {
      await import('./routing-registration');
    },
  },
  // for server-side, the next magic line sends all unmatched routes:
  ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
]);
// end::snippet[]
