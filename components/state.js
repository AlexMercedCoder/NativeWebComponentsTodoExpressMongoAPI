export default {
    todos: [],
    showForm: false,
    reminder: "",
    completed: false,
    _id: "",
    action: "create",
    url: "http://localhost:10000/todos",
    reset: function(){
        this.showForm = false
        this.reminder = ""
        this.completed = false
        this._id = ""
        this.action = "create"
        this.update()
    },
    getTodos: async function(){
        const response = await fetch(this.url)
        const data = await response.json()
        this.todos = data
        this.reset()
    },
    updates: [],
    update: function(){
        this.updates.forEach((f) => f())
    },
    handleCreate: async function(todo){
        await fetch(this.url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })

        this.getTodos()
    },
    handleUpdate: async function(todo){
        await fetch(this.url + `/${todo._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })

        this.getTodos()
    },
    handleDelete: async function(todo){
        await fetch(this.url + `/${todo._id}`, {
            method: "delete"
        })

        this.getTodos()
    }
}