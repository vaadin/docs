// tag::routing-basic[]
import {Router} from '@vaadin/router';
import {Flow} from '@vaadin/flow-frontend/Flow';

const {serverSideRoutes} = new Flow({
  imports: () => import('../../../target/frontend/generated-flow-imports')
});
export const router = new Router(document.querySelector('#outlet'));

// List all the application routes here
router.setRoutes([
  {
    path: 'help',
    component: 'routing-basic',
    action: async () => { await import('./routing-basic'); }
  },
  // for server-side, the next magic line sends all unmatched routes:
  ...serverSideRoutes // IMPORTANT: this must be the last entry in the array
]);
// end::routing-basic[]

