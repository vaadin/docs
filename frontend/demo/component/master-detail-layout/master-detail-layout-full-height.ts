const style = document.createElement('style');
style.textContent = `
  html, body, .render, .render > * {
    height: 100%;
  }
`;
document.head.appendChild(style);
