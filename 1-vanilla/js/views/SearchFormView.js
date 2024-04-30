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
    this.on("submit", (event) => this.handleSubmit(event));
    on(this.resetElement, "click", () => this.handleReset());
  }

  handleKeyUp() {
    const { value } = this.inputElement; // destructuring 으로 value 만 사용
    this.showResetButton(value.length > 0);

    if (value.length <= 0) {
      this.handleReset();
    }
  }

  handleSubmit(event) {
    event.preventDefault(); // enter 입력시 page reload 방지
    console.log(tag, "handleSubmit");
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }

  handleReset() {
    console.log(tag, "handleReset");
    this.emit("@reset");
  }

  show(value = "") {
    this.inputElement.value = value;
    this.showResetButton(this.inputElement.value.length > 0);

    super.show();
  }
}
