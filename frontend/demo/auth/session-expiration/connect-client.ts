import { ConnectClient, InvalidSessionMiddleware } from '@vaadin/hilla-frontend';

// tag::snippet[]
const client = new ConnectClient({
  prefix: 'connect',
  middlewares: [
    new InvalidSessionMiddleware(async () => {
      // Imported here, because the overlay imports the services,
      // which import this client
      const { promptLogin } = await import('./SessionExpiredLoginOverlay');
      return promptLogin();
    }),
  ],
});

export default client;
// end::snippet[]
