import { html, LitElement } from 'lit';

export default class Example extends LitElement {
  createRenderRoot() {
    return this;
  }

  navLinks = [
    {
      href: '/docs',
      label: 'Docs',
    },
    {
      href: '/blog',
      label: 'Blog',
    },
    {
      href: 'https://github.com/vaadin/hilla',
      label: 'GitHub',
    },
  ];

  render() {
    return html`<div class="hilla-header-wrapper">
      <div class="hilla-header hilla-header--container">
        <div>
          <a class="hilla-header--logo" href="/">
            <svg width="90" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M31.221 12.934c-.59-2.335-2.646-4.167-5.007-4.507 2.411-6.67-6.041-11.51-10.511-6.095-4.477-5.419-12.928-.567-10.51 6.098-6.921 1.211-6.927 10.995 0 12.206-1.351 3.363.625 7.31 4.124 8.212 2.288.656 4.927-.226 6.383-2.11 1.093 1.429 3.018 2.35 4.784 2.315 4.226.055 7.341-4.39 5.725-8.425 3.513-.467 6.008-4.186 5.012-7.694Zm-13.738 4.572-.135.078c-.964.555-2.323.555-3.287 0a3.75 3.75 0 0 0-.134-.078h-.01a3.468 3.468 0 0 1-1.193-1.223 3.491 3.491 0 0 1-.469-1.648v-.201a3.481 3.481 0 0 1 1.047-2.389 3.442 3.442 0 0 1 2.405-.98c3.505.036 4.735 4.63 1.789 6.44h-.013ZM10.906 2.707a3.436 3.436 0 0 1 2.84 1.501A2.374 2.374 0 0 0 15.7 5.215a2.398 2.398 0 0 0 1.98-1.045c1.768-2.573 6.182-1.602 6.269 2.01 0 .593-.152 1.177-.44 1.694a3.463 3.463 0 0 1-1.207 1.264c-1.587 1.005-3.644.452-4.641-.981A2.389 2.389 0 0 0 15.7 7.144a2.347 2.347 0 0 0-1.947 1.005c-1.173 1.713-3.781 2.088-5.337.435-2.092-2.163-.54-5.885 2.489-5.877ZM14.22 23.85c-.643 2.322-3.504 3.286-5.417 1.793-1.324-1.003-1.692-2.838-1.008-4.27a2.299 2.299 0 0 0-.088-2.13l-.068-.117a2.302 2.302 0 0 0-1.804-1.13c-1.106-.097-2.166-.734-2.714-1.727-1.523-2.636.909-5.85 3.816-5.105 2.206.537 3.187 2.99 2.29 4.875a2.355 2.355 0 0 0 .106 2.18l.02.034a2.364 2.364 0 0 0 1.844 1.173 3.453 3.453 0 0 1 1.451.461c1.344.755 2.027 2.494 1.574 3.963h-.002Zm14.06-7.58a3.439 3.439 0 0 1-2.719 1.724 2.243 2.243 0 0 0-1.786 1.107l-.089.155a2.249 2.249 0 0 0-.084 2.114c1.413 2.84-1.652 6.269-4.832 4.523-2.295-1.326-2.283-4.687-.017-6.006a3.465 3.465 0 0 1 1.486-.463 2.265 2.265 0 0 0 1.791-1.139l.075-.13a2.312 2.312 0 0 0 .065-2.136c-.728-1.56-.21-3.558 1.363-4.477.29-.172.604-.3.932-.38 2.946-.729 5.333 2.46 3.818 5.107h-.002Z" fill="url(#b)"/></g><g clip-path="url(#c)" fill="#fff"><path d="M42.28 11.138a6.671 6.671 0 0 1 1.623-.977 4.554 4.554 0 0 1 1.781-.359 5.558 5.558 0 0 1 2.524.57 5.933 5.933 0 0 1 1.963 1.575 7.464 7.464 0 0 1 1.288 2.347 8.73 8.73 0 0 1 .462 2.872v5.726c.002.263-.051.523-.157.763a1.935 1.935 0 0 1-1.038 1.011 1.96 1.96 0 0 1-1.503 0 1.96 1.96 0 0 1-1.029-1.01 1.841 1.841 0 0 1-.157-.764v-5.726a4.991 4.991 0 0 0-.21-1.362 3.437 3.437 0 0 0-.561-1.088 2.669 2.669 0 0 0-.878-.732 2.443 2.443 0 0 0-1.158-.285 2.864 2.864 0 0 0-1.209.254 2.762 2.762 0 0 0-.931.7c-.264.311-.469.67-.603 1.057-.15.432-.224.887-.219 1.345v5.76a1.95 1.95 0 0 1-.148.763 1.96 1.96 0 0 1-1.035 1.043 1.965 1.965 0 0 1-2.137-.422 2.053 2.053 0 0 1-.415-.62 1.95 1.95 0 0 1-.149-.764v-16.4a2.02 2.02 0 0 1 .58-1.419 1.93 1.93 0 0 1 2.744.006c.177.182.318.398.412.635.099.248.15.513.148.78l.011 4.721Zm12.645-5.615c.107-.25.26-.476.449-.67a2.096 2.096 0 0 1 1.47-.62c.278 0 .552.057.807.168a2.2 2.2 0 0 1 .673.453 2.071 2.071 0 0 1 .62 1.495 2.126 2.126 0 0 1-.62 1.496 2.2 2.2 0 0 1-.673.453 2.02 2.02 0 0 1-1.613 0 2.096 2.096 0 0 1-1.113-1.128 2.087 2.087 0 0 1-.163-.82 2.064 2.064 0 0 1 .163-.827Zm3.878 17.309a1.95 1.95 0 0 1-.148.763c-.1.232-.24.442-.415.621a1.986 1.986 0 0 1-.62.422 1.937 1.937 0 0 1-1.503 0 1.988 1.988 0 0 1-.62-.422 2.187 2.187 0 0 1-.424-.62 1.87 1.87 0 0 1-.154-.764v-11.09c-.001-.26.051-.517.154-.755.103-.234.247-.447.424-.63.182-.18.397-.324.634-.421.247-.1.51-.152.776-.151.256 0 .508.05.744.15.227.097.433.24.603.422.169.185.305.398.4.63.1.239.15.496.15.755v11.09Zm7.017.014c.003.263-.048.523-.151.764a1.962 1.962 0 0 1-1.032 1.028 1.987 1.987 0 0 1-1.52 0 1.961 1.961 0 0 1-1.032-1.028 1.89 1.89 0 0 1-.149-.764V6.366A1.9 1.9 0 0 1 62.5 4.99a1.948 1.948 0 0 1 1.377-.572c.515 0 1.01.205 1.377.572.178.174.32.382.415.613.102.24.154.5.151.763v16.48Zm7.014 0a1.889 1.889 0 0 1-.564 1.376 1.96 1.96 0 0 1-.617.416 1.987 1.987 0 0 1-1.52 0 2.02 2.02 0 0 1-.62-.416 1.883 1.883 0 0 1-.56-1.376V6.366a1.907 1.907 0 0 1 .56-1.376 1.96 1.96 0 0 1 .62-.413 1.935 1.935 0 0 1 2.137.413 1.9 1.9 0 0 1 .564 1.376v16.48Zm2.241-5.456a7.37 7.37 0 0 1 .594-2.95 7.858 7.858 0 0 1 1.613-2.41 7.61 7.61 0 0 1 2.373-1.633 7.297 7.297 0 0 1 5.757 0 7.558 7.558 0 0 1 3.963 3.989 7.66 7.66 0 0 1 .625 2.91v5.465a2.044 2.044 0 0 1-.58 1.433 2.01 2.01 0 0 1-.626.43 1.936 1.936 0 0 1-.782.16 1.787 1.787 0 0 1-.998-.278 1.828 1.828 0 0 1-.685-.788 7.947 7.947 0 0 1-1.795.906 5.911 5.911 0 0 1-1.98.333 7.125 7.125 0 0 1-2.891-.595 7.681 7.681 0 0 1-2.373-1.624 7.726 7.726 0 0 1-1.612-2.41 7.391 7.391 0 0 1-.603-2.937Zm3.884 0c-.007.49.09.976.28 1.425.182.432.443.825.769 1.157a3.536 3.536 0 0 0 2.524 1.051 3.55 3.55 0 0 0 1.402-.285c.42-.18.802-.442 1.122-.772.322-.334.58-.726.76-1.156a3.67 3.67 0 0 0 0-2.83 3.755 3.755 0 0 0-.76-1.139c-.32-.331-.7-.595-1.122-.774a3.55 3.55 0 0 0-1.402-.285 3.503 3.503 0 0 0-1.366.27 3.533 3.533 0 0 0-1.158.784 3.681 3.681 0 0 0-.768 1.14 3.5 3.5 0 0 0-.281 1.423v-.008Z"/></g><defs><linearGradient id="b" x1="7.709" y1="27.814" x2="23.43" y2=".756" gradientUnits="userSpaceOnUse"><stop stop-color="#FF006B"/><stop offset=".495" stop-color="#FC5B00"/><stop offset="1" stop-color="#F9BD00"/></linearGradient></defs></svg>
          </a>
        </div>

        <ul class="hilla-header--nav">
          ${this.navLinks.map((item) => html`<li><a href=${item.href}>${item.label}</a></li>`)}
        </ul>
      </div>
    </div>`;
  }
}
