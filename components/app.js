import State from "./state";
import "./display";
import "./form";

export class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<div>
    <h1>Alex's Todo App</h1>
    <button>Create Todos</button>
    <my-display></my-display>
    <div id="form">
    </div>
    </div>`;
    State.updates.push(() => this.renderForm());
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      State.showForm = !State.showForm;
      State.update();
    });
  }

  async connectedCallback(){
    await State.getTodos()
    await State.update()
  }

  renderForm() {
    this.shadowRoot.querySelector("#form").innerHTML = State.showForm
      ? `<my-form></my-form>`
      : null;
  }
}

customElements.define("my-app", App);
