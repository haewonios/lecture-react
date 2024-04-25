import { qs, on } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyUp());
    on(this.element, "submit", (event) => this.handleSubmit(event));
  }

  handleKeyUp() {
    console.log(tag, "handleKeyUp", this.inputElement.value);
    const { value } = this.inputElement; // destructuring 으로 value 만 사용
    this.showResetButton(value.length > 0);
  }

  handleSubmit(event) {
    event.preventDefault(); // enter 입력시 page reload 방지
    console.log(tag, "handleSubmit");
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }
}
