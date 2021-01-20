// Uses the Vaadin provided login an logout helper methods
import { login as loginImpl, logout as logoutImpl } from '@vaadin/flow-frontend';
import type { LoginResult } from '@vaadin/flow-frontend';

// check if user is logged in or not by checking if there 
// is an login event in the past 30 days
const LAST_LOGIN_TIMESTAMP = 'lastLoginTimestamp';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const lastLoginTimestamp = localStorage.getItem(LAST_LOGIN_TIMESTAMP);
const hasRecentLoginTimestamp = (lastLoginTimestamp &&
  (new Date().getTime() - new Date(+lastLoginTimestamp).getTime()) < THIRTY_DAYS_MS) || false;

let _isLoggedIn = hasRecentLoginTimestamp;

export async function login(username: string, password: string): Promise<LoginResult> {
  if (_isLoggedIn) {
    return { error: false } as LoginResult;
  } else {
    // Use the Vaadin provided login helper method to 
    // obtain the login result
    const result = await loginImpl(username, password);
    if (!result.error) {
      _isLoggedIn = true;
      // update the last login timestamp in the local storage
      localStorage.setItem(LAST_LOGIN_TIMESTAMP, new Date().getTime() + '')
    }
    return result;
  }
}

export async function logout() {
  _isLoggedIn = false;
  // clear the last login timestamp from the local storage
  // when logging out.
  localStorage.removeItem(LAST_LOGIN_TIMESTAMP);
  return await logoutImpl();
}

export function isLoggedIn() {
  return _isLoggedIn;
}

export function setSessionExpired() {
  _isLoggedIn = false;
  localStorage.removeItem(LAST_LOGIN_TIMESTAMP);
} 