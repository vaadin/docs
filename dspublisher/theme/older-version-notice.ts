// Shows a notice with a security alert signup form at the top of the article
// when the reader is viewing docs for a version older than the latest one, and
// highlights the version selector. The versions are read from the selector that
// DSPublisher renders, so this is a no-op on the latest and pre-release docs.
import { html, LitElement, nothing, svg } from 'lit';
import { property, state } from 'lit/decorators.js';

// TODO: Replace SIGNUP_URL with the real endpoint before shipping. The form
// POSTs JSON `{ email, version }` to it and expects a 2xx response.
const SIGNUP_URL = 'https://example.invalid/TODO-security-alert-signup';
const EXTENDED_MAINTENANCE_URL = 'https://vaadin.com/maintenance';
const PRIVACY_POLICY_URL = 'https://vaadin.com/privacy-policy';

// Stores 'dismissed' or 'subscribed' per version; either hides the notice
const STORAGE_KEY = 'vaadin.docsApp.olderVersionNotice';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Icons use the same 24px stroke style as the DSPublisher dismiss button
const icon = (path: ReturnType<typeof svg>) => html`
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${path}
  </svg>
`;
const closeIcon = icon(svg`<path d="M6 18L18 6M6 6l12 12" />`);
const emailIcon = icon(
  svg`<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />`
);
const checkIcon = icon(svg`<path d="M5 13l4 4L19 7" />`);
const spinnerIcon = icon(svg`<path d="M12 3a9 9 0 1 0 9 9" />`);

interface Version {
  title: string;
  number: string;
  path: string;
}

function toVersion(link: HTMLAnchorElement): Version {
  const title = link.querySelector('[class*="versionTitle"]')?.textContent?.trim() ?? '';
  return { title, number: title.replace(/^Vaadin\s*/, ''), path: link.pathname };
}

class OlderVersionNotice extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ attribute: false })
  current!: Version;

  @property({ attribute: false })
  latest!: Version;

  @state()
  private status: 'idle' | 'sending' | 'done' | 'error' = 'idle';

  // The same page in the latest version, once it's confirmed to exist there.
  // Until then, the latest version link goes to its docs home.
  @state()
  private latestPage?: string;

  dismissed = false;

  // TODO: Pick one design and remove the others (see `?older-version=1|2|3`)
  design: 1 | 2 | 3 = 1;

  connectedCallback() {
    super.connectedCallback();
    this.findLatestPage();
  }

  private async findLatestPage() {
    const url = this.latest.path + location.pathname.slice(this.current.path.length);
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        this.latestPage = url;
      }
    } catch {
      // Keep the link to the docs home
    }
  }

  private async dismiss() {
    this.dismissed = true;
    localStorage.setItem(`${STORAGE_KEY}.${this.current.number}`, 'dismissed');
    if (!reducedMotion()) {
      await this.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150 }).finished;
    }
    this.remove();
  }

  private async submit(e: SubmitEvent) {
    e.preventDefault();
    if (this.status === 'sending' || this.status === 'done') {
      return;
    }
    const email = new FormData(e.target as HTMLFormElement).get('email');
    this.status = 'sending';
    try {
      const response = simulate
        ? await simulateSignup(String(email))
        : await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, version: `${this.current.number}.x` }),
          });
      if (!response.ok) {
        throw new Error(`Signup failed with status ${response.status}`);
      }
      localStorage.setItem(`${STORAGE_KEY}.${this.current.number}`, 'subscribed');
      this.status = 'done';
    } catch (error) {
      console.error(error);
      this.status = 'error';
    }
  }

  // On success, only the submit button changes: it turns into the confirmation.
  // The live region announces it to screen readers.
  // All three labels are rendered in the same grid cell, and only the current
  // one is visible, so the button keeps the width of the widest one
  private renderSubmitButton(label: string, className = 'submit') {
    const done = this.status === 'done';
    const sending = this.status === 'sending';
    const state = (name: string, current: boolean, content: unknown) =>
      html`<span class="state state-${name} ${current ? 'current' : ''}">${content}</span>`;
    return html`
      <button
        class="${className} ${done ? 'done' : ''}"
        aria-disabled=${done || sending ? 'true' : 'false'}
      >
        <span class="states">
          ${state('idle', !done && !sending, label)}
          ${state('sending', sending, html`${spinnerIcon} Subscribing…`)}
          ${state('done', done, html`${checkIcon} Subscribed`)}
        </span>
      </button>
    `;
  }

  private renderStatus() {
    return html`
      <span class="visually-hidden" role="status">
        ${this.status === 'done' ? "You're subscribed to security alerts." : ''}
      </span>
    `;
  }

  private renderError() {
    return this.status === 'error'
      ? html`<p role="alert">Something went wrong. Please try again.</p>`
      : nothing;
  }

  private renderPrivacy() {
    return html`
      <p class="privacy">
        Unsubscribe anytime.
        <a href=${PRIVACY_POLICY_URL} target="_blank" rel="noopener">Privacy policy</a>
      </p>
    `;
  }

  private renderForm() {
    return html`
      <form @submit=${this.submit}>
        <span class="email-field">
          ${emailIcon}
          <input
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="you@company.com"
            aria-label="Email address"
            ?readonly=${this.status === 'sending' || this.status === 'done'}
          />
        </span>
        ${this.renderSubmitButton('Get Security Alerts')}
      </form>
      ${this.renderStatus()} ${this.renderError()} ${this.renderPrivacy()}
    `;
  }

  private get latestLink() {
    return html`<a href=${this.latestPage ?? this.latest.path}>${this.latest.title}</a>`;
  }

  private renderDesign1() {
    return html`
      <div class="title">
        You're reading the ${this.current.title} docs. The latest version is ${this.latestLink}.
      </div>
      <p class="intro">
        Staying on ${this.current.number}? Get security fix alerts and a reminder before free
        maintenance ends.
      </p>
      ${this.renderForm()}
      <!-- Same markup as a [.buttons] list in AsciiDoc, as in the commercial feature notice -->
      <div class="ulist buttons">
        <ul>
          <li>
            <p>
              <a href="/docs/v${this.latest.number}/upgrading">
                Upgrade Guide: ${this.current.number} → ${this.latest.number}
              </a>
            </p>
          </li>
          <li>
            <p>
              <a href=${EXTENDED_MAINTENANCE_URL}
                >Extended Maintenance for ${this.current.number}</a
              >
            </p>
          </li>
        </ul>
      </div>
    `;
  }

  // Design 2 keeps the notice short and moves the signup form into a dialog
  private renderDesign2() {
    return html`
      <div class="title">You're reading the ${this.current.title} docs.</div>
      <p class="intro">${this.latestLink} is the latest version.</p>
      <div class="ulist buttons">
        <ul>
          <li>
            <p>
              ${
                this.status === 'done'
                  ? html`<a
                      href="#security-alerts"
                      class="done"
                      aria-disabled="true"
                      @click=${(e: Event) => e.preventDefault()}
                      >${checkIcon} Subscribed</a
                    >`
                  : html`<a href="#security-alerts" role="button" @click=${this.openDialog}>
                      Get Security Alerts for ${this.current.number}
                    </a>`
              }
            </p>
          </li>
          <li>
            <p>
              <a href=${EXTENDED_MAINTENANCE_URL}
                >Extended Maintenance for ${this.current.number}</a
              >
            </p>
          </li>
          <li class="primary">
            <p>
              <a href="/docs/v${this.latest.number}/upgrading">
                Upgrade Guide: ${this.current.number} → ${this.latest.number}
              </a>
            </p>
          </li>
        </ul>
      </div>
    `;
  }

  private openDialog(e: Event) {
    e.preventDefault();
    if (this.status === 'error') {
      this.status = 'idle';
    }
    const dialog = this.querySelector('dialog');
    if (dialog && !dialog.open) {
      dialog.showModal();
      this.animateDialog(dialog, 'in');
    }
  }

  private closing = false;

  private async closeDialog() {
    const dialog = this.querySelector('dialog');
    if (!dialog?.open || this.closing) {
      return;
    }
    this.closing = true;
    await this.animateDialog(dialog, 'out');
    dialog.close();
    this.closing = false;
  }

  // Fades and slightly scales the dialog, and fades its backdrop
  private async animateDialog(dialog: HTMLDialogElement, direction: 'in' | 'out') {
    if (reducedMotion()) {
      return;
    }
    const options: KeyframeAnimationOptions = {
      duration: 150,
      easing: 'ease-out',
      direction: direction === 'in' ? 'normal' : 'reverse',
    };
    await Promise.all([
      dialog.animate(
        [
          { opacity: 0, transform: 'scale(0.96)' },
          { opacity: 1, transform: 'none' },
        ],
        options
      ).finished,
      dialog.animate([{ opacity: 0 }, { opacity: 1 }], { ...options, pseudoElement: '::backdrop' })
        .finished,
    ]);
  }

  // Esc closes the dialog through closeDialog(), so it animates out too
  private cancelDialog(e: Event) {
    e.preventDefault();
    this.closeDialog();
  }

  // Closes the dialog on clicks on its backdrop, which target the dialog itself.
  // Clicks on the dialog's padding also do, so the position is checked too.
  private closeDialogOnBackdropClick(e: MouseEvent) {
    const dialog = e.currentTarget as HTMLDialogElement;
    if (e.target !== dialog) {
      return;
    }
    const rect = dialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) {
      this.closeDialog();
    }
  }

  private renderDialog() {
    return html`
      <dialog
        aria-labelledby="older-version-notice-dialog-title"
        @click=${this.closeDialogOnBackdropClick}
        @cancel=${this.cancelDialog}
      >
        <button class="dismiss" aria-label="Close" @click=${this.closeDialog}>${closeIcon}</button>
        <div class="dialog-title" id="older-version-notice-dialog-title">
          Get ${this.current.title} Security Alerts
        </div>
        <p class="dialog-description">
          Get an email when a security fix ships, and a reminder before free maintenance ends.
        </p>
        <form @submit=${this.submit}>
          <label for="older-version-notice-email">Email address</label>
          <input
            id="older-version-notice-email"
            autofocus
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="you@company.com"
            ?readonly=${this.status === 'sending' || this.status === 'done'}
          />
          ${this.renderStatus()} ${this.renderError()} ${this.renderPrivacy()}
          <div class="dialog-actions">
            <button type="button" class="cancel" @click=${this.closeDialog}>
              ${this.status === 'done' ? 'Close' : 'Cancel'}
            </button>
            ${this.renderSubmitButton('Subscribe')}
          </div>
        </form>
      </dialog>
    `;
  }

  // Design 3 takes after the hero on the docs home page, and uses its markup and styles
  private renderDesign3() {
    return html`
      <div class="openblock hero">
        <div class="content">
          <header>
            <span class="eyebrow">${this.current.title} Docs</span>
            <a class="latest" href=${this.latestPage ?? this.latest.path}>
              Latest version: ${this.latest.title}
            </a>
            <button class="dismiss" aria-label="Dismiss" @click=${this.dismiss}>
              ${closeIcon}
            </button>
          </header>
          <div class="column">
            <h2>Staying on ${this.current.title}?</h2>
            <p class="lead">
              Get an email when a security advisory affects your version, with the fixed release and
              how to upgrade, and a reminder before free maintenance ends.
            </p>
            <form class="buttons" @submit=${this.submit}>
              <span class="email-field">
                ${emailIcon}
                <input
                  type="email"
                  name="email"
                  required
                  autocomplete="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  ?readonly=${this.status === 'sending' || this.status === 'done'}
                />
              </span>
              ${this.renderSubmitButton('Get Security Alerts', 'button primary water')}
            </form>
            ${this.renderStatus()} ${this.renderError()} ${this.renderPrivacy()}
            <div class="buttons">
              <a class="button secondary water" href="/docs/v${this.latest.number}/upgrading">
                Upgrade Guide: ${this.current.number} → ${this.latest.number}
              </a>
              <a class="button secondary water" href=${EXTENDED_MAINTENANCE_URL}>
                Extended Maintenance for ${this.current.number}
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.design === 3) {
      return this.renderDesign3();
    }

    // Uses the markup of an AsciiDoc admonition block, so it gets the docs' callout styles
    return html`
      <div class="admonitionblock note">
        <table>
          <tbody>
            <tr>
              <td class="icon"><div class="title">Note</div></td>
              <td class="content">
                ${this.design === 2 ? this.renderDesign2() : this.renderDesign1()}
              </td>
            </tr>
          </tbody>
        </table>
        <button class="dismiss" aria-label="Dismiss" @click=${this.dismiss}>${closeIcon}</button>
      </div>
      ${this.design === 2 ? this.renderDialog() : nothing}
    `;
  }
}

customElements.define('docs-older-version-notice', OlderVersionNotice);

// The version selector is empty on the dev server, so `?older-version` in the
// URL shows the notice as if viewing V24, ignoring an earlier dismissal or signup.
// `?older-version=2` and `?older-version=3` show designs 2 and 3.
const simulate =
  process.env.NODE_ENV === 'development' &&
  new URLSearchParams(location.search).has('older-version');

// On the dev server, the signup is simulated: it succeeds after a second, or
// fails when the email address starts with "fail"
async function simulateSignup(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return new Response(null, { status: email.startsWith('fail') ? 500 : 200 });
}

// Returns undefined until the version selector has rendered, and null when the
// current version isn't older than the latest one
function findVersions(): { current: Version; latest: Version } | null | undefined {
  if (simulate) {
    return {
      current: { title: 'Vaadin 24', number: '24', path: '/' },
      latest: { title: 'Vaadin 25', number: '25', path: '/docs/latest/' },
    };
  }

  const links = [...document.querySelectorAll<HTMLAnchorElement>('[class*="versionSelect"] nav a')];
  if (links.length === 0) {
    return undefined;
  }
  const latestIndex = links.findIndex((link) => link.pathname === '/docs/latest/');
  const currentIndex = links.findIndex((link) => link.className.includes('versionActive'));
  if (latestIndex < 0 || currentIndex <= latestIndex) {
    return null;
  }
  return { current: toVersion(links[currentIndex]), latest: toVersion(links[latestIndex]) };
}

let notice: OlderVersionNotice | undefined;
let retryScheduled = false;

// Keeps watching only while the notice may still need to be added, or re-added
// after React re-renders the article
const observer = new MutationObserver(attachOlderVersionNotice);

function attachOlderVersionNotice() {
  if (notice?.dismissed) {
    observer.disconnect();
    return;
  }
  if (notice?.isConnected) {
    return;
  }

  const versions = findVersions();
  if (versions === null) {
    observer.disconnect();
    return;
  }
  const article = document.querySelector('article[class*="articleLayout"]');
  if (!versions || !article) {
    return;
  }

  document.documentElement.classList.add('docs-older-version');

  // The article is rendered by a React island. Adding the notice before React
  // has hydrated it causes a hydration mismatch, and React re-renders the
  // article without it. React hydrates in document order, so the article is
  // done once its last element is attached to a React fiber.
  const last = article.lastElementChild;
  if (last && !Object.keys(last).some((key) => key.startsWith('__reactFiber'))) {
    if (!retryScheduled) {
      retryScheduled = true;
      requestAnimationFrame(() => {
        retryScheduled = false;
        attachOlderVersionNotice();
      });
    }
    return;
  }

  if (!notice) {
    if (!simulate && localStorage.getItem(`${STORAGE_KEY}.${versions.current.number}`)) {
      // Dismissed or subscribed earlier; only the version selector stays highlighted
      observer.disconnect();
      return;
    }
    notice = new OlderVersionNotice();
    notice.current = versions.current;
    notice.latest = versions.latest;
    const design = simulate ? new URLSearchParams(location.search).get('older-version') : null;
    if (design === '2' || design === '3') {
      notice.design = Number(design) as 2 | 3;
    }
  }
  article.prepend(notice);
}

observer.observe(document.documentElement, { childList: true, subtree: true });
attachOlderVersionNotice();
