import type { DashboardSectionItem } from '@vaadin/react-components-pro';
import type { WidgetConfig } from './react/dashboard-editable';

class DashboardStorage {
  private storageKey = 'dashboard-config';

  load(): Array<DashboardSectionItem<WidgetConfig> | WidgetConfig> {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  save(config: Array<DashboardSectionItem<WidgetConfig> | WidgetConfig>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(config));
  }
}

export const dashboardStorage = new DashboardStorage();
