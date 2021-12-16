import { SelectValueChangedEvent } from '@vaadin/select';
import '@vaadin/button';
import '@vaadin/select';
import '@vaadin/checkbox';
import { html, LitElement, render } from 'lit';
import { guard } from 'lit/directives/guard';
import { customElement, state } from 'lit/decorators';
import { Checkbox, CheckboxCheckedChangedEvent } from '@vaadin/checkbox';

const VAADIN_VERSIONS: Record<string, string> = {
  14: '14.8.0',
  15: '15.0.6',
  16: '16.0.5',
  17: '17.0.11',
  18: '18.0.7',
  19: '19.0.9',
  20: '20.0.8',
  21: '21.0.9',
  22: '22.0.1',
};

const SIMPLE_VERSIONS: string[] = [];
for (const k in VAADIN_VERSIONS) {
  SIMPLE_VERSIONS.push(k);
}

const DEFAULT_FROM = '14';
const DEFAULT_TO = '22';

@customElement('upgrade-tool')
export default class UpgradeTool extends LitElement {
  @state()
  private fromVersion = '';
  @state()
  private toVersion = '';
  @state()
  private isFlow = true;
  @state()
  private isFusion = false;
  @state()
  private isSpring = true;

  render() {
    return html`
      <div>
        <h2>Select your Vaadin versions:</h2>
        <div style="margin-bottom: 10px">${this.createSelectComponents()}</div>
        <div style="margin-bottom: 10px">
          <vaadin-checkbox
            id="flow-checkbox"
            label="Flow"
            ?checked=${this.isFlow}
            @checked-changed=${this.flowChanged}
          ></vaadin-checkbox>
          <vaadin-checkbox
            id="fusion-checkbox"
            label="Fusion"
            ?checked=${this.isFusion}
            @checked-changed=${this.fusionChanged}
          ></vaadin-checkbox>
        </div>
        <div>
          <vaadin-checkbox
            id="spring-checkbox"
            label="Spring Project"
            style="font-size: var(--lumo-font-size-s);"
            ?disabled=${this.isFusion}
            ?checked=${this.isSpring}
            @checked-changed=${this.springChanged}
          ></vaadin-checkbox>
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
    const elements = [
      document.getElementById('before-upgrade'),
      document.getElementById('after-upgrade'),
    ];

    if (this.isFlow) {
      const flowElements = this.getFrameworkInstructions('flow');
      elements.push(...flowElements);
    }

    if (this.isFusion) {
      const fusionElements = this.getFrameworkInstructions('fusion');
      elements.push(...fusionElements);
    }

    if (this.isSpring) {
      document
        .querySelectorAll('.spring-instructions')
        .forEach((elem) => elem.classList.remove('hidden'));
    }

    elements.forEach((e) => {
      if (!e) {
        return;
      }
      this.updateVaadinVersionsInElement(e);
      e.classList.remove('hidden');
    });
  }

  private getFrameworkInstructions(framework: string): any {
    const elements: HTMLElement[] = [];
    let elem = document.getElementById(
      `${framework}-instructions-${this.fromVersion}-${this.toVersion}`
    );
    if (elem) {
      elements.push(elem);
    } else {
      let idx = SIMPLE_VERSIONS.indexOf(this.fromVersion);
      const endIdx = SIMPLE_VERSIONS.indexOf(this.toVersion);
      for (idx; idx < endIdx; idx++) {
        elem = document.getElementById(
          `${framework}-instructions-${SIMPLE_VERSIONS[idx]}-${SIMPLE_VERSIONS[idx + 1]}`
        );
        if (elem) elements.push(elem);
      }
    }
    return elements;
  }

  private hideOldInstructions() {
    document
      .querySelectorAll('.upgrade-instructions')
      .forEach((elem) => elem.classList.add('hidden'));
  }

  private updateVaadinVersionsInElement(e: HTMLElement) {
    e.querySelectorAll('.vaadin-to-version-simple').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${this.toVersion}`)
    );
    e.querySelectorAll('.vaadin-to-version-full').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${VAADIN_VERSIONS[this.toVersion]}`)
    );
    e.querySelectorAll('.vaadin-from-version-simple').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${this.fromVersion}`)
    );
    e.querySelectorAll('.vaadin-from-version-full').forEach(
      (elem) => ((<HTMLElement>elem).innerText = `${VAADIN_VERSIONS[this.fromVersion]}`)
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

  private flowChanged(e: CheckboxCheckedChangedEvent) {
    this.isFlow = e.detail.value;
  }

  private fusionChanged(e: CheckboxCheckedChangedEvent) {
    this.isFusion = e.detail.value;
    if (this.isFusion) {
      this.isSpring = true;
      const checkbox = <Checkbox>document.getElementById('spring-checkbox');
      checkbox.checked = true;
    }
  }

  private springChanged(e: CheckboxCheckedChangedEvent) {
    this.isSpring = e.detail.value;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.fromVersion = DEFAULT_FROM;
    this.toVersion = DEFAULT_TO;
  }
}
