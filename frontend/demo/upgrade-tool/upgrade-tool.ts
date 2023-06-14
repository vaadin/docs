import { SelectValueChangedEvent } from '@vaadin/select';
import '@vaadin/button';
import '@vaadin/select';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import '@vaadin/details';
import '@vaadin/notification';
import { html, LitElement, render } from 'lit';
import { guard } from 'lit/directives/guard.js';
import { customElement, state } from 'lit/decorators.js';
import { Checkbox } from '@vaadin/checkbox';
import { CheckboxGroupValueChangedEvent } from '@vaadin/checkbox-group';
import { Notification } from '@vaadin/notification';
import { applyTheme } from 'Frontend/generated/theme';

const VAADIN_VERSIONS: Record<string, string> = {
  14: '14.8.3',
  15: '15.0.6',
  16: '16.0.5',
  17: '17.0.11',
  18: '18.0.7',
  19: '19.0.9',
  20: '20.0.8',
  21: '21.0.9',
  22: '22.1.0',
};

const SIMPLE_VERSIONS: string[] = [];
for (const k in VAADIN_VERSIONS) {
  SIMPLE_VERSIONS.push(k);
}

const DEFAULT_FROM = '14';
const DEFAULT_TO = '22';

const HARDCODED_VERSIONS_CLASS = 'vaadin-to-version-full';

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

@customElement('upgrade-tool')
export default class UpgradeTool extends LitElement {
  @state()
  private fromVersion = '';
  @state()
  private toVersion = '';
  @state()
  private frameworkValue = ['flow'];
  @state()
  private extraSettingsValue = ['spring'];

  private isFlow = true;
  private isFusion = false;
  private isSpring = true;
  private isTypeScript = true;

  render() {
    return html`
      <div>
        <h2>Select your Vaadin versions:</h2>
        <div style="margin-bottom: 10px">${this.createSelectComponents()}</div>
        <vaadin-details>
          <div slot="summary">Earlier Versions</div>
          <ul style="margin-top: 0">
            <li>
              <a href="https://vaadin.com/docs/v14/flow/upgrading/v10-13/"
                >Upgrading from Vaadin 10–13 to Vaadin 14</a
              >
            </li>
            <li>
              <a href="https://vaadin.com/docs/v14/flow/upgrading/v8/"
                >Upgrading from Vaadin 8 to Vaadin 14</a
              >
            </li>
          </ul>
        </vaadin-details>
        <div style="margin-bottom: 10px">
          <vaadin-checkbox-group
            label="Framework"
            id="framework-checkbox-group"
            .value="${this.frameworkValue}"
            @value-changed=${this.frameworkChanged}
            theme="horizontal"
          >
            <vaadin-checkbox value="flow" label="Flow" id="flow-checkbox"></vaadin-checkbox>
            <vaadin-checkbox value="fusion" label="Fusion" id="fusion-checkbox"></vaadin-checkbox>
          </vaadin-checkbox-group>
        </div>
        <div>
          <vaadin-checkbox-group
            label="I use"
            id="extra-settings-checkbox-group"
            .value="${this.extraSettingsValue}"
            @value-changed=${this.extraSettingsChanged}
            theme="horizontal"
          >
            <vaadin-checkbox
              value="spring"
              label="Spring Boot"
              id="spring-checkbox"
              ?disabled=${this.isFusion || (!this.isFusion && !this.isFlow)}
            ></vaadin-checkbox>
            <vaadin-checkbox
              value="typescript"
              label="TypeScript-based views"
              id="typescript-checkbox"
              ?disabled=${this.isFusion || (!this.isFusion && !this.isFlow)}
            ></vaadin-checkbox>
          </vaadin-checkbox-group>
        </div>
        <vaadin-button
          theme="primary"
          style="width: fit-content; margin-top: 30px; margin-bottom: 30px"
          @click=${this.showUpdateInstructions}
          >Show update instructions!</vaadin-button
        >
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  private showUpdateInstructions() {
    this.hideOldInstructions();
    this.replaceHardCodedVersions();

    if (this.isFlow || this.isFusion) {
      this.showElementsWithClassname('all');
    } else {
      Notification.show('Please select a framework!');
      return;
    }

    const versionSectionElements: HTMLElement[] = this.getVersionSectionElements(
      this.fromVersion,
      this.toVersion
    );
    versionSectionElements.forEach((e) => this.setElementVisible(e, true));

    if (this.isSpring) {
      this.showElementsWithClassname('spring');
    }

    if (this.isTypeScript) {
      this.showElementsWithClassname('ts');
    }

    if (this.isFlow) {
      this.showElementsWithClassname('flow');
    }

    if (this.isFusion) {
      this.showElementsWithClassname('fusion');
    }
  }

  private showElementsWithClassname(classname: string) {
    this.getElementsByClassname(classname).forEach((e) => this.setElementVisible(e, true));
  }

  private getVersionSectionElements(fromVersion: string, toVersion: string) {
    const elementsToShow: HTMLElement[] = [];
    const classname = `v${fromVersion}-${toVersion}`;
    const elements = this.getElementsByClassname(classname);

    if (elements.length > 0) {
      elementsToShow.push(...elements);
    } else {
      const idx = SIMPLE_VERSIONS.indexOf(fromVersion);
      const nextVersion = SIMPLE_VERSIONS[idx + 1];
      elementsToShow.push(...this.getVersionSectionElements(fromVersion, nextVersion));
      elementsToShow.push(...this.getVersionSectionElements(nextVersion, toVersion));
    }

    return elementsToShow;
  }

  private setElementVisible(element: HTMLElement, isVisible: boolean): void {
    if (isVisible) {
      element.style.setProperty('display', 'block');
    } else {
      element.style.setProperty('display', 'none');
    }
  }

  private getElementsByClassname(classname: string) {
    return <HTMLElement[]>[...document.querySelectorAll('.' + classname)];
  }

  private hideOldInstructions() {
    document
      .querySelectorAll(
        "[class*='all'], [class*='flow'], [class*='fusion'], [class*='spring'], [class*='ts'], [class*='v1'], [class*='v2'], [class*='v3'], [class*='v4']"
      )
      .forEach((elem) => this.setElementVisible(<HTMLElement>elem, false));
  }

  private replaceHardCodedVersions() {
    this.getElementsByClassname(HARDCODED_VERSIONS_CLASS).forEach(
      (e) => (e.textContent = VAADIN_VERSIONS[this.toVersion])
    );
  }

  private createSelectComponents() {
    const fromVersionList = SIMPLE_VERSIONS.slice(0, -1);
    const toVersionList = SIMPLE_VERSIONS.slice(1);
    return html`<vaadin-select
        label="From"
        id="from-select"
        style="width: fit-content; margin-right: 10px"
        value=${this.fromVersion}
        @value-changed=${this.fromVersionChanged}
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  ${fromVersionList.map((v) => html`<vaadin-item value="${v}">${v}</vaadin-item>`)}
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>
      <vaadin-select
        label="To"
        id="to-select"
        value=${this.toVersion}
        @value-changed=${this.toVersionChanged}
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  ${toVersionList.map(
                    (v) =>
                      html`<vaadin-item value="${v}" ?hidden=${v <= this.fromVersion}
                        >${v}</vaadin-item
                      >`
                  )}
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>`;
  }

  private fromVersionChanged(e: SelectValueChangedEvent) {
    const val = e.detail.value;
    if (parseInt(val) >= parseInt(this.toVersion)) {
      const idx = SIMPLE_VERSIONS.indexOf(val);
      this.toVersion = SIMPLE_VERSIONS[idx + 1];
    }
    this.fromVersion = val;
  }

  private toVersionChanged(e: SelectValueChangedEvent) {
    this.toVersion = e.detail.value;
  }

  private frameworkChanged(e: CheckboxGroupValueChangedEvent) {
    const val = e.detail.value;
    this.frameworkValue = val;

    this.isFlow = val.includes('flow');

    if (this.frameworkValue.includes('fusion')) {
      this.isFusion = true;
      this.isSpring = true;
      this.isTypeScript = true;

      ['spring', 'typescript'].forEach((v) => {
        this.extraSettingsValue.indexOf(v) === -1 ? this.extraSettingsValue.push(v) : null;
        const checkbox = <Checkbox>document.getElementById(`${v}-checkbox`);
        checkbox.checked = true;
      });
    } else {
      this.isFusion = false;
    }
  }

  private extraSettingsChanged(e: CheckboxGroupValueChangedEvent) {
    const val = e.detail.value;
    this.extraSettingsValue = val;

    this.isSpring = val.includes('spring') || this.isFusion;
    this.isTypeScript = val.includes('typescript') || this.isFusion;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.fromVersion = DEFAULT_FROM;
    this.toVersion = DEFAULT_TO;
  }
}
