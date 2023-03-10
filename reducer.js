import storage from './util/storage.js'

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.completed,
        completed: (todo) => todo.completed
    },
    editIndex: null

}

const actions = {
    add(state, title){
        if(title) {
            var date = new Date()
            state.todos.forEach((todo, index) => {
                if(todo.title === title) {
                    this.destroy(state, index)
                }
            })
            state.todos.unshift({title, completed: false, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`})
            storage.set(state.todos)
        }
    },
    destroy({todos}, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    toggle({todos}, index) {
        todos[index].completed = !todos[index].completed
        storage.set(todos)
    },
    toggleAll({todos}, completed) {
        todos.forEach(function(todo) {
            todo.completed = completed
        })
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    switchFilter(state, filter) {
        state.filter = filter
    },
    startEdit(state, index) {
        state.editIndex = index
    },
    endEdit(state, title) {
        if(state.editIndex != null) {
            if(title) {
                state.todos[state.editIndex].title = title
                storage.set(state.todos)
            }else {
                this.destroy(state, state.editIndex)
            }
            state.editIndex = null
        }
    },
    cancelEdit(state) {
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action]&&actions[action](state, args)
    return state
}