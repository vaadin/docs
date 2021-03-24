/**
 * Borrowed from
 *   https://github.com/Artur-/a-vaadin-helper/blob/master/src/main/resources/META-INF/resources/frontend/a-notification.ts
 * with minor fixes to satisfy prettier and fix missing types.
 */
import '@vaadin/vaadin-notification';
import type { NotificationElement, NotificationPosition } from '@vaadin/vaadin-notification';

interface Options {
  position?: NotificationPosition;
  theme?: string;
  duration?: number;
}
export const showNotification = (text: string, options: Options = { position: 'middle' }) => {
  _showNotification(text, options);
};

export const showErrorNotification = (
  text: string,
  options: Options = { position: 'middle', duration: -1, theme: 'error' }
) => {
  _showNotification(text, options);
};

export type NotificationOpenedChanged = CustomEvent<{ opened: boolean }>;

export interface NotificationElementEventMap {
  'opened-changed': NotificationOpenedChanged;
}

export interface NotificationEventMap extends HTMLElementEventMap, NotificationElementEventMap {}

interface Notification extends NotificationElement {
  _container: HTMLElement;

  addEventListener<K extends keyof NotificationEventMap>(
    type: K,
    listener: (this: NotificationElement, ev: NotificationEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof NotificationEventMap>(
    type: K,
    listener: (this: NotificationElement, ev: NotificationEventMap[K]) => void,
    options?: boolean | EventListenerOptions
  ): void;
}

const _showNotification = (text: string, options: Options) => {
  const n = document.createElement('vaadin-notification') as Notification;
  const tpl = document.createElement('template');
  const span = document.createElement('span');
  span.innerText = text;
  tpl.content.appendChild(span);
  n.appendChild(tpl);
  document.body.appendChild(n);
  n.opened = true;
  n.addEventListener('opened-changed', (e: NotificationOpenedChanged) => {
    if (!e.detail.opened) {
      document.body.removeChild(n);
    }
  });
  n._container.addEventListener('click', () => {
    n.opened = false;
  });

  if (options.theme) {
    n.setAttribute('theme', options.theme);
  }
  if (options.position) {
    n.position = options.position;
  }
  if (options.duration) {
    n.duration = options.duration;
  }

  return n;
};
