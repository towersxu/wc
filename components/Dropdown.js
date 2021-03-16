customElements.define('wc-dropdown', class extends HTMLElement {
  static get observedAttributes() {
    return ['trigger'];
  }
  constructor() {
    super()
    const style = document.createElement('style');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(style);
    style.textContent = this.getStyleText();
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'wc-dropdown';
    shadowRoot.appendChild(this.rootEl);
  }
  connectedCallback() {
    const trigger = this.getAttribute('trigger');
    console.log(trigger);
    if (trigger === 'hover') {
      this.addEventListener('mouseenter', () => {
        this.show();
      });
    }
  }
  getStyleText() {
    return `
      .wc-dialog-wrapper {
        width: 100%;
        height: 100%;
      }
    `
  }
  show() {

  }
});