export function includeModule(css: string) {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}
