// tag::impl[]
// Uses the Vaadin provided login an logout helper methods
import { login as loginImpl, LoginResult, logout as logoutImpl } from '@vaadin/flow-frontend';
// end::impl[]
// tag::userinfo[]
import { UserInfoEndpoint } from 'Frontend/generated/UserInfoEndpoint';
import UserInfo from 'Frontend/generated/com/vaadin/demo/fusion/security/authentication/UserInfo';
// end::userinfo[]
// tag::basic[]

interface Authentication {
  // tag::userinfo[]
  user: UserInfo;
  // end::userinfo[]
  // tag::offline[]
  timestamp: number;
  // end::offline[]
}

let authentication: Authentication | undefined = undefined;

// end::basic[]
// tag::offline[]
// tag::storage-defs[]
const AUTHENTICATION_KEY = 'authentication';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
// end::storage-defs[]

// tag::restore[]
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
    // Delete expired stored authentication
    setSessionExpired();
  }
}

// end::restore[]
// end::offline[]
/**
 * Forces the session to expire and removes user information stored in
 * `localStorage`.
 */
// tag::logout[]
export function setSessionExpired() {
  authentication = undefined;
  // tag::offline[]

  // Delete the authentication from the local storage
  localStorage.removeItem(AUTHENTICATION_KEY);
  // end::offline[]
}

// end::logout[]
/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
// tag::login[]
export async function login(username: string, password: string): Promise<LoginResult> {
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
      // tag::offline[]
      timestamp: new Date().getTime(),
      // end::offline[]
    };
    // tag::offline[]

    // Save the authentication to local storage
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(authentication));
    // end::offline[]
  }

  return result;
}

// end::login[]
/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
// tag::logout[]
export async function logout() {
  setSessionExpired();
  return await logoutImpl();
}

// end::logout[]
/**
 * Checks if the user is logged in.
 */
// tag::isLoggedIn[]
export function isLoggedIn() {
  return !!authentication;
}

// end::isLoggedIn[]
/**
 * Checks if the user has the role.
 */
// tag::isUserInRole[]
export function isUserInRole(role: string) {
  if (!authentication) {
    return false;
  }

  return authentication.user.authorities.includes(`ROLE_${role}`);
}

// end::isUserInRole[]
