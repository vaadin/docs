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
    if (this.status === 'sending') {
      return;
    }
    const email = new FormData(e.target as HTMLFormElement).get('email');
    this.status = 'sending';
    try {
      const response = await fetch(SIGNUP_URL, {
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

  private renderForm() {
    if (this.status === 'done') {
      return html`
        <p class="success" role="status">
          ${checkIcon} You're subscribed. We'll email you when a security fix ships.
        </p>
      `;
    }

    const sending = this.status === 'sending';
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
            ?readonly=${sending}
          />
        </span>
        <button class="submit" aria-disabled=${sending ? 'true' : 'false'}>
          ${sending ? html`${spinnerIcon} Subscribing…` : 'Get Security Alerts'}
        </button>
      </form>
      ${
        this.status === 'error'
          ? html`<p role="alert">Something went wrong. Please try again.</p>`
          : nothing
      }
      <p class="privacy">
        Unsubscribe anytime.
        <a href=${PRIVACY_POLICY_URL} target="_blank" rel="noopener">Privacy policy</a>
      </p>
    `;
  }

  render() {
    // Uses the markup of an AsciiDoc admonition block, so it gets the docs' callout styles
    return html`
      <div class="admonitionblock note">
        <table>
          <tbody>
            <tr>
              <td class="icon"><div class="title">Note</div></td>
              <td class="content">
                <div class="title">
                  You're reading the ${this.current.title} docs. The latest version is
                  <a href=${this.latestPage ?? this.latest.path}>${this.latest.title}</a>.
                </div>
                <p class="intro">
                  Staying on ${this.current.number}? Get security fix alerts and a reminder before
                  free maintenance ends.
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
                        <a href=${EXTENDED_MAINTENANCE_URL}>
                          Extended Maintenance for ${this.current.number}
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="dismiss" aria-label="Dismiss" @click=${this.dismiss}>${closeIcon}</button>
      </div>
    `;
  }
}

customElements.define('docs-older-version-notice', OlderVersionNotice);

// The version selector is empty on the dev server, so `?older-version` in the
// URL shows the notice as if viewing V24, ignoring an earlier dismissal or signup
const simulate =
  process.env.NODE_ENV === 'development' &&
  new URLSearchParams(location.search).has('older-version');

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
  }
  article.prepend(notice);
}

observer.observe(document.documentElement, { childList: true, subtree: true });
attachOlderVersionNotice();
