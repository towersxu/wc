import { LitElement } from 'lit-element';

export class MyElement extends LitElement {
  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick}>
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }
} 

customElements.define('my-element', MyElement);