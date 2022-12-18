import Task  from "./task.js";
import {UI} from "./UI.js";

let complete = 0;

// Captura de datos del form
document.getElementById("task-form")
        .addEventListener("submit", e =>{
            const title = document.getElementById("title").value
            const content = document.getElementById("content").value
            const task = new Task(title, content);
            const ui = new UI();
            e.preventDefault();
            ui.addTask(task);
            ui.resetForm();
        })

document.getElementById("task-accordion").addEventListener("click", e => {
    const ui = new UI();
    const element = e.target
    
    if(element.name === "delete"){
        ui.deleteTask(element)
    } else if(element.name === "complete"){
        complete++;
        ui.completeTask(element, complete);
    }
})