
import {LitElement, html, css} from 'lit-element';

export class WcDropdown extends LitElement {
  static get styles() {
    return css`
      .dropdown-trigger{
        display: inline-block;
      }
      .dropdown-menu {
        display:none;
        padding: 10px 0;
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        width: 150px;
        position: absolute;
      }
      .popper__arrow {
        top: -13px;
        left: 50%;
        border-color: transparent;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #ebeef5;
        border-width: 6px;
        filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
      }
      .popper__arrow:after {
        top: -5px;
        margin-left: -6px;
        border-top-width: 0;
        content: " ";
        border-width: 6px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-bottom-color: #fff;
      }
      .dropdown-menu-ul {
        width: 150px;
      }
      .dropdown-menu__show {
        display:inline-block;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      trigger: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      isShowMenu: { type: Boolean },
    };
  }
  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    const childNodes = slot.assignedNodes({flatten: true});
    return Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
  }
  constructor() {
    super();
  }

  clickHandler() {
    if (this.isShowMenu) return;
    this.show();
    setTimeout(() => {
      document.addEventListener('click', this.clickOutSideHandle);
    });
  }

  clickOutSideHandle = (e) => {
    if(this.isClickOutSide(e.target)) {
      this.hide();
      document.removeEventListener('click', this.clickOutSideHandle);
    }
  }

  isClickOutSide(targetEl) {
    const flyoutEl =  this.shadowRoot.querySelector('.dropdown-menu');
    const buttonEl = this.shadowRoot.querySelector('.dropdown-trigger');
     
    do {
      if(targetEl == flyoutEl || targetEl === buttonEl) {
        return false;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);
    return true;
  }
  
  show() {
    clearTimeout(this.timeout);
    const d = this._slottedChildren[0];
    this.top = d.offsetTop + d.offsetHeight + 2;
    this.left = d.offsetLeft - d.offsetWidth / 2;
    this.isShowMenu = true;
  }

  hide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isShowMenu = false;
    }, this.trigger === 'click' ? 0 : 200);
  }

  leave() {
    if (this.trigger === 'hover') {
      this.hide();
    }
  }
  render() {
    // todo: 这个要基于slot的元素动态计算~
    const left = this.left;
    const top = this.top;
    return html`
      ${
        this.trigger === 'hover' ?
        html`<div class="dropdown-trigger" @mouseenter="${this.show}" @mouseleave="${this.hide}"><slot></slot></div>`:
        html`<div class="dropdown-trigger" @click="${this.clickHandler}"><slot></slot></div>`
      }
      <div
        class="${
          this.isShowMenu ? 'dropdown-menu dropdown-menu__show' : 'dropdown-menu'
        }"
        style="left:${left}px; top:${top}px"
        @mouseenter="${this.show}"
        @mouseleave="${this.leave}"
      >
        <div class="popper__arrow"></div>
        <slot
        name="dropdown" class="dropdown-menu-ul">
      </slot>
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define('wc-dropdown', WcDropdown);
