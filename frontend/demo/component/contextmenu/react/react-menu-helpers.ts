import type { MenuBarItem } from '@vaadin/menu-bar/src/vaadin-menu-bar-item.js';
import type React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Renders a React given component into a HTMLElement.
 */
export const menuComponent = (component: React.ReactNode): HTMLElement => {
  const container = document.createElement('div');
  createRoot(container).render(component);
  return container;
};

/**
 * Renders a React given component into a MenuBarItem.
 */
export const menuBarItemComponent = (component: React.ReactNode): MenuBarItem => {
  const container = document.createElement('vaadin-menu-bar-item');
  createRoot(container).render(component);
  return container;
};
