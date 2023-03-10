import html from '../core.js'
import {connect} from '../store.js'

function TodoItem({todo, index, editIndex}) {
    return html`
        <li class="${todo.completed&&'completed'} 
            ${editIndex===index&&'editing'}"
            
        >
            <div class="view">
                <input 
                    class="toggle" type="checkbox" 
                    ${todo.completed&&'checked'}
                    onchange="dispatch('toggle', ${index})"
                    
                >
                <label ondblclick="dispatch('startEdit', ${index})">
                    <span>${todo.title}</span>
                    <span style="float: right; margin-right: 40px; color: black; font-size: 1rem; line-height: 26px">${todo.time}</span>
                </label>
                <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
            </div>
            <input 
                class="edit"
                value="${todo.title}"
                onkeyup="event.keyCode===13&&dispatch('endEdit', this.value.trim()) || event.keyCode===27&&dispatch('cancelEdit')"
                onblur="dispatch('endEdit', this.value.trim())"
            >
        </li>
    `
}

export default connect()(TodoItem)