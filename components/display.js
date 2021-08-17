import State from "./state";

export class Display extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<main><h1>No ToDo</h1></main>`;
    State.updates.push(() => this.renderTodos());
  }

  renderTodos() {
    const todos = State.todos
      .map(
        (todo) => `<div id=${todo._id}>
        <h3>${todo.reminder} - ${todo.completed ? "O" : "X"}</h3>
      </div>
      <button id=${todo._id}>Delete</button>`
      )
      .join("");
    this.shadowRoot.querySelector("main").innerHTML = todos;
    const divs = this.shadowRoot.querySelectorAll("div");
    divs.forEach((div) => {
      div.addEventListener("click", (event) => {
        const todo = State.todos.find((t) => {
          return div.id === t._id;
        });
        State.reminder = todo.reminder;
        State.completed = todo.completed;
        State._id = todo._id;
        State.action = "update";
        State.showForm = true;
        State.update();
      });
    });

    const buttons = this.shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const todo = State.todos.find((t) => {
          return button.id === t._id;
        });
        State.handleDelete(todo)
      });
    });
  }
}

customElements.define("my-display", Display);
