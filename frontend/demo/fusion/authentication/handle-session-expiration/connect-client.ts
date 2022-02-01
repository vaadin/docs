import { ConnectClient, InvalidSessionMiddleware } from '@vaadin/fusion-frontend';
import { setSessionExpired } from '../auth';
const client = new ConnectClient({
  prefix: 'connect',
  middlewares: [
    new InvalidSessionMiddleware(async () => {
      setSessionExpired();
      const { LoginView } = await import('./login-overlay');
      return LoginView.showOverlay();
    }),
  ],
});
export default client;
