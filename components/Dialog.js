class WcDialog extends HTMLElement {
  static get observedAttributes() {
    return ['width', 'visible', 'title', 'append-to-body'];
  }
  constructor() {
    super()
    const style = document.createElement('style');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(style);
    style.textContent = this.getStyleText();
    this.rootEl = document.createElement('div');
    this.rootEl.className = 'wc-dialog-wrapper';
    shadowRoot.appendChild(this.rootEl);
  }
  getStyleText() {
    return `
      .wc-dialog-wrapper {
        width: 100%;
        height: 100%;
      }
      .wc-mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }
      .wc-dialog {
        width: 600px;
        height: 300px;
        background: #FFF;
        position: absolute;
        left: 50%;
        top: 50%;
        box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
        transform: translate(-50%, -50%);
      }
    `
  }
  setRootStyle (style) {
    Object.entries(style).forEach(([key, value]) => {
      this.style[key] = value
    });
  }
  setVisible(isVisible) {
    if (isVisible === 'true') {
      this.setRootStyle({
        display: 'block',
      });
    } else {
      this.setRootStyle({
        display: 'none',
      });
      let ev = new CustomEvent('close', {
        bubbles: false,
        detail: {
          result: 2,
          a: 3,
        }
      });
      this.dispatchEvent(ev);
    }
  }
  connectedCallback() {
    this.setRootStyle({
      position: 'absolute',
      zIndex: 999,
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      display: 'none',
    });
    const temp = this.getTemplate();
    this.rootEl.appendChild(temp.content.cloneNode(true));
    this.rootEl.querySelector('.wc-mask').addEventListener('click', () => {
      this.setAttribute('visible', false);
    })
    document.body.appendChild(this);
  }
  getTemplate() {
    const temp = document.createElement('template');
    const title = '提示';
    temp.innerHTML = `
      <div class="wc-mask"></div>
      <div class="wc-dialog">
        <div class="dialog-header">${title}</div>
        <div id="dialog-content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
    return temp;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue)
    if (name === 'visible') {
      this.setVisible(newValue);
    }
  }
}

customElements.define('wc-dialog', WcDialog);