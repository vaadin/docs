// tag::class[]
import { css, html, LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// In a real project, you would import from the npm package:
// import { Widget, type WidgetConfig } from '@acme/widget';
//
// For this example, the types are defined locally to illustrate the pattern.

interface WidgetConfig {
  type?: string;
  animate?: boolean;
  interactive?: boolean;
  onChange?(data: WidgetData): void;
}

interface WidgetData {
  label: string;
  value: number;
}

// Placeholder for the third-party Widget class.
// In a real project, this comes from the npm package.
class Widget {
  private _config: WidgetConfig;

  constructor(_container: HTMLElement, config: WidgetConfig) {
    this._config = config;
  }

  updateConfig(config: WidgetConfig): void {
    this._config = { ...this._config, ...config };
  }

  setInteractive(interactive: boolean): void {
    this._config.interactive = interactive;
  }

  destroy(): void {
    // cleanup
  }
}

@customElement('acme-widget-wrapper')
class AcmeWidgetWrapper extends LitElement {
  // -- Reactive properties (synced with Java via element properties) --

  @property({ type: String })
  accessor title: string = '';

  @property({ type: Object })
  accessor config: WidgetConfig = {};

  @property({ type: Boolean })
  accessor interactive: boolean = true;

  // -- Internal state (not exposed as attributes) --

  @state()
  private accessor _widget: Widget | null = null;

  @state()
  private accessor _loading: boolean = true;

  // -- Styles --

  static override styles = css`
    :host {
      display: block;
    }
    .container {
      border: 1px solid var(--lumo-contrast-20pct, #ccc);
      border-radius: var(--lumo-border-radius-m, 4px);
      padding: var(--lumo-space-m, 16px);
    }
    .loading {
      color: var(--lumo-secondary-text-color, #999);
    }
  `;

  // -- Lifecycle --

  override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._initWidget();
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // Re-configure when config changes after initial render
    if (changedProperties.has('config') && this._widget) {
      this._widget.updateConfig(this.config);
    }

    if (changedProperties.has('interactive') && this._widget) {
      this._widget.setInteractive(this.interactive);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up to prevent memory leaks
    if (this._widget) {
      this._widget.destroy();
      this._widget = null;
    }
  }

  // -- Private methods --

  private _initWidget(): void {
    const container = this.renderRoot.querySelector('#widget-root');
    if (!container) return;

    this._widget = new Widget(container as HTMLElement, {
      ...this.config,
      interactive: this.interactive,
      onChange: (data: WidgetData) => {
        // Dispatch event for Java-side listener
        this.dispatchEvent(
          new CustomEvent('widget-change', {
            detail: data,
            bubbles: true,
            composed: true,
          })
        );
      },
    });

    this._loading = false;
  }

  // -- Render --

  override render() {
    return html`
      <div class="container">
        ${this.title ? html`<h3>${this.title}</h3>` : ''}
        ${this._loading ? html`<div class="loading">Loading widget...</div>` : ''}
        <div id="widget-root"></div>
      </div>
    `;
  }
}

export { AcmeWidgetWrapper };
// end::class[]
