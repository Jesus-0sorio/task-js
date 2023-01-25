import Task from "./task.js";
import { UI } from "./UI.js";

let complete = 0;
let taskDB = [];

document.addEventListener("DOMContentLoaded", () => {
  taskDB.push(...JSON.parse(localStorage.getItem("task")));
  complete = localStorage.getItem("taskComplete") || 0;
  const ui = new UI();
  taskDB.forEach((e) => {
    ui.addTask(e);
  });
  ui.completeTask(complete);
});

// Captura de datos del form
document.getElementById("task-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  e.preventDefault();
  if (title === "" || content === "")
    return alert("El titulo y la descripcion no pueden estar vacios");
  const task = new Task(title, content);
  const ui = new UI();
  ui.addTask(task);
  taskDB.push(task);
  ui.local("task", taskDB);
  ui.resetForm();
});

document.getElementById("task-accordion").addEventListener("click", (e) => {
  const ui = new UI();
  const element = e.target;
  if (element.name === "delete") {
    taskDB = ui.changeData(taskDB, element);
    ui.deleteTask(element);
  } else if (element.name === "complete") {
    complete++;
    ui.local("taskComplete", complete);
    taskDB = ui.changeData(taskDB, element);
    ui.completeTask(complete);
    ui.deleteTask(element);
  }
});
