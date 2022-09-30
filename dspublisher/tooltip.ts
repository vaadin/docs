import { Tooltip } from '@vaadin/tooltip';
// This is a temporary override for V23.3.0-alpha1

const Vaadin = (window as any).Vaadin = (window as any).Vaadin || {};
const Flow = Vaadin.Flow = Vaadin.Flow || {};

Flow.tooltip = {
  setDefaultHideDelay: (hideDelay: number) => Tooltip.setDefaultHideDelay(hideDelay),
  setDefaultFocusDelay: (focusDelay: number) => Tooltip.setDefaultFocusDelay(focusDelay),
  setDefaultHoverDelay: (hoverDelay: number) => Tooltip.setDefaultHoverDelay(hoverDelay),
}