// Uses the Vaadin provided login an logout helper methods
import { login as loginImpl, LoginResult, logout as logoutImpl } from '@vaadin/flow-frontend';
// tag::userinfo[]
import { UserInfoEndpoint } from 'Frontend/generated/UserInfoEndpoint';
import UserInfo from 'Frontend/generated/com/vaadin/demo/fusion/security/authentication/UserInfo';
// end::userinfo[]

interface Authentication {
  // tag::userinfo[]
  user: UserInfo;
  // end::userinfo[]
  timestamp: number;
}

let authentication: Authentication | undefined = undefined;

const AUTHENTICATION_KEY = 'authentication';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// Get authentication from local storage
const storedAuthenticationJson = localStorage.getItem(AUTHENTICATION_KEY);
if (storedAuthenticationJson !== null) {
  const storedAuthentication = JSON.parse(storedAuthenticationJson) as Authentication;
  // Check that the stored timestamp is not older than 30 days
  const hasRecentAuthenticationTimestamp =
    new Date().getTime() - storedAuthentication.timestamp < THIRTY_DAYS_MS;
  if (hasRecentAuthenticationTimestamp) {
    // Use loaded authentication
    authentication = storedAuthentication;
  } else {
    // Delete expired stored notification
    setSessionExpired();
  }
}

/**
 * Forces the session to expire and removes user information stored in
 * `localStorage`.
 */
export function setSessionExpired() {
  // Delete the authentication from the local storage
  authentication = undefined;
  localStorage.removeItem(AUTHENTICATION_KEY);
}

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function login(username: string, password: string): Promise<LoginResult> {
  if (authentication) {
    return { error: false } as LoginResult;
  }

  // Use the Vaadin provided login helper method to obtain the login result
  const result = await loginImpl(username, password);
  if (!result.error) {
    // tag::userinfo[]
    // Get user info from endpoint
    const user = await UserInfoEndpoint.getUserInfo();
    // end::userinfo[]
    authentication = {
      // tag::userinfo[]
      user,
      // end::userinfo[]
      timestamp: new Date().getTime(),
    };

    // Save the authentication to local storage
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(authentication));
  }

  return result;
}

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function logout() {
  setSessionExpired();
  return await logoutImpl();
}

/**
 * Checks if the user is logged in.
 *
 * Uses `localStorage` for offline support.
 */
export function isLoggedIn() {
  return !!authentication;
}
// tag::userinfo[]

/**
 * Checks if the user is logged in.
 *
 * Uses `localStorage` for offline support.
 */
export function isUserInRole(role: string) {
  return !!authentication && authentication.user.authorities.includes(`ROLE_${role}`);
}
// end::userinfo[]
