import State from "./state";

export class Form extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<div>
    <form>
    <input type=text>
    <input type="checkbox">
    <input type="submit">
    </form>
    </div>`;
    this.shadowRoot.querySelector("input[type=text]").value = State.reminder
    this.shadowRoot.querySelector("input[type=checkbox]").checked = State.completed
    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => this.handleSubmit(e))
  }

  handleSubmit(event){
      event.preventDefault()
      const reminder = this.shadowRoot.querySelector("input[type=text]").value
      const completed = this.shadowRoot.querySelector("input[type=checkbox]").checked
      const todo = {reminder, completed}

      if(State.action === "create"){
          State.handleCreate(todo)
      }

      if (State.action === "update"){
          todo._id = State._id
          State.handleUpdate(todo)
      }
  }
}

customElements.define("my-form", Form);