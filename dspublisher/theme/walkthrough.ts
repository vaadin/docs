// Walkthroughs: an ordered list marked [.walkthrough] in AsciiDoc, one step per item, each with a short
// looping clip (video::) or a still (image::). Written that way, a walkthrough reads as a numbered list
// with every step shown. This script turns it into one step at a time, with Back and Next, and the arrow
// keys while it has focus. "Show all steps" switches back to the list.
//
// A [.walkthrough] block without a list is one clip on its own, for a page that has a section for each: it
// plays while it's in view.
//
// Each clip has a dark-theme twin next to it, named with a -dark suffix (01-edit-mode-dark.mp4). The
// script shows the one that matches the docs theme, and switches when the theme changes.
//
//   [.walkthrough]
//   .Change a button's caption
//   . Switch to *Edit* mode in the toolbar.
//   +
//   video::{articles}/vaadin/videos/copilot/edit-text/01-edit-mode.mp4[options="autoplay,loop,muted",poster=…]

const ENHANCED = 'walkthrough-enhanced';
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

function togglePlay(video: HTMLVideoElement) {
  if (video.paused) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

const isDark = () =>
  (document.documentElement.getAttribute('theme') ?? '').split(/\s+/).includes('dark');

/** The URL of a clip or still in the current theme: the light one as written, or its -dark twin. */
function themed(url: string, dark: boolean) {
  const light = url.replace(/-dark(\.\w+)$/, '$1');
  return dark ? light.replace(/(\.\w+)$/, '-dark$1') : light;
}

function applyTheme(block: HTMLElement) {
  const dark = isDark();
  for (const video of block.querySelectorAll('video')) {
    const src = video.getAttribute('src');
    if (src && themed(src, dark) !== src) {
      const playing = !video.paused;
      video.src = themed(src, dark);
      if (video.poster) video.poster = themed(video.poster, dark);
      if (playing) video.play().catch(() => {});
    }
  }
  for (const img of block.querySelectorAll('img')) {
    const src = img.getAttribute('src');
    if (src && themed(src, dark) !== src) img.src = themed(src, dark);
  }
}

/** Our own Pause, instead of the browser's controls: the clips loop, and a looping video needs a way to stop it. */
function setUpVideos(block: HTMLElement) {
  for (const video of block.querySelectorAll('video')) {
    video.controls = false;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = false;
    video.preload = 'none';
    video.addEventListener('click', () => togglePlay(video));
    const pause = document.createElement('button');
    pause.type = 'button';
    pause.className = 'walkthrough-pause';
    const sync = () => {
      pause.textContent = video.paused ? 'Play' : 'Pause';
      pause.classList.toggle('paused', video.paused);
    };
    pause.addEventListener('click', () => togglePlay(video));
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.parentElement!.append(pause);
    sync();
  }
}

const inView = new IntersectionObserver(
  (entries) => {
    for (const { target, isIntersecting } of entries) {
      const video = target as HTMLVideoElement;
      if (!isIntersecting) {
        video.pause();
      } else if (!REDUCED_MOTION.matches) {
        video.preload = 'auto';
        video.play().catch(() => {});
      }
    }
  },
  { threshold: 0.5 }
);

function enhance(block: HTMLElement) {
  const list = block.querySelector('ol');
  const steps = list ? ([...list.children] as HTMLElement[]) : [];
  if (!list) {
    block.classList.add(ENHANCED);
    setUpVideos(block);
    applyTheme(block);
    for (const video of block.querySelectorAll('video')) inView.observe(video);
    return;
  }
  if (steps.length < 2) return;
  block.classList.add(ENHANCED, 'walkthrough-steps');
  block.tabIndex = -1;
  let at = 0;
  // Set below, once the controls it updates exist.
  let show: (i: number) => void = () => {};

  const progress = document.createElement('div');
  progress.className = 'walkthrough-progress';
  const dots = steps.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Step ${i + 1}`);
    dot.addEventListener('click', () => show(i));
    progress.append(dot);
    return dot;
  });

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'walkthrough-toggle';
  toggle.addEventListener('click', () => {
    const all = block.classList.toggle('walkthrough-all');
    toggle.textContent = all ? 'One step at a time' : 'Show all steps';
    toggle.setAttribute('aria-pressed', String(all));
    if (all) for (const video of block.querySelectorAll('video')) video.pause();
    else show(at);
  });
  toggle.textContent = 'Show all steps';
  toggle.setAttribute('aria-pressed', 'false');

  const label = document.createElement('p');
  label.className = 'walkthrough-label';
  label.setAttribute('aria-live', 'polite');

  const nav = document.createElement('div');
  nav.className = 'walkthrough-nav';
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'walkthrough-back';
  back.textContent = 'Back';
  back.addEventListener('click', () => show(at - 1));
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'walkthrough-next';
  next.addEventListener('click', () => show(at === steps.length - 1 ? 0 : at + 1));
  nav.append(back, next);

  const header = document.createElement('div');
  header.className = 'walkthrough-header';
  header.append(progress, toggle);
  list.before(header, label);
  list.after(nav);

  setUpVideos(block);

  show = (i: number) => {
    at = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((step, j) => {
      step.classList.toggle('walkthrough-current', j === at);
      for (const video of step.querySelectorAll('video')) {
        if (j === at) {
          video.preload = 'auto';
          video.currentTime = 0;
          if (!REDUCED_MOTION.matches) video.play().catch(() => {});
        } else {
          video.pause();
          // The next clip loads while this one plays, so Next doesn't wait.
          if (j === at + 1) video.preload = 'auto';
        }
      }
    });
    dots.forEach((dot, j) => {
      dot.classList.toggle('done', j < at);
      if (j === at) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    label.textContent = `Step ${at + 1} of ${steps.length}`;
    back.disabled = at === 0;
    next.textContent = at === steps.length - 1 ? 'Start over' : 'Next';
  };

  block.addEventListener('keydown', (e) => {
    if (block.classList.contains('walkthrough-all') || e.target instanceof HTMLInputElement) return;
    if (e.key === 'ArrowRight' && at < steps.length - 1) {
      e.preventDefault();
      show(at + 1);
    } else if (e.key === 'ArrowLeft' && at > 0) {
      e.preventDefault();
      show(at - 1);
    }
  });

  applyTheme(block);
  show(0);
}

const PENDING = 'walkthrough-pending';

function enhanceAll() {
  for (const block of document.querySelectorAll<HTMLElement>(
    `.walkthrough:not(.${ENHANCED}):not(.${PENDING})`
  )) {
    // The article is a React island, inside another: changing it before React has hydrated it makes React
    // throw the server's HTML away. Astro removes the ssr attribute when hydration starts; React finishes
    // in later tasks, so wait for the browser to be idle as well.
    if (!block.closest('astro-island[ssr]')) {
      block.classList.add(PENDING);
      const run = () => {
        block.classList.remove(PENDING);
        if (block.isConnected) {
          enhance(block);
        }
      };
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 1500 });
      } else {
        setTimeout(run, 300);
      }
    }
  }
}

// The docs navigate without reloading the page: enhance walkthroughs as they arrive and once their
// island has hydrated, and follow the theme.
new MutationObserver((records) => {
  if (records.some((r) => r.type === 'attributes' && r.attributeName === 'theme')) {
    document.querySelectorAll<HTMLElement>(`.${ENHANCED}`).forEach(applyTheme);
  }
  enhanceAll();
}).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['ssr', 'theme'],
});
enhanceAll();
