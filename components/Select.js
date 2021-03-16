customElements.define('wc-select', class extends HTMLElement {

});

customElements.define('wc-option', class extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }
});
