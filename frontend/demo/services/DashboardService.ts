import type WidgetConfig from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig';

const key = 'dashboard-config';

class DashboardService {
  // eslint-disable-next-line @typescript-eslint/require-await
  async loadDashboard(): Promise<WidgetConfig[] | null> {
    const config = localStorage.getItem(key);
    return config ? JSON.parse(config) : null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async saveDashboard(config: WidgetConfig[]): Promise<void> {
    localStorage.setItem(key, JSON.stringify(config));
  }
}

export default new DashboardService();
