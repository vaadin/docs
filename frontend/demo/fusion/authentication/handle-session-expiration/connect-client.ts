import { ConnectClient, InvalidSessionMiddleware } from '@hilla/frontend';
import { setSessionExpired } from '../auth.js';
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
