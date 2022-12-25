export class UI {
  addTask(task) {
    const listTask = document.getElementById("task-accordion");
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="accordion-item" id="${task.id}">
        <h2 class="accordion-header">
        <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#${
              task.title
                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )
                .split(" ")
                .join("") + task.id.slice(0, 6)
            }"
            aria-expanded="false"
            aria-controls="${task.id.slice(0, 8)}"
        >
            ${task.title}
            </button>
        </h2>
        <div
        id="${
          task.title
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
            .split(" ")
            .join("") + task.id.slice(0, 6)
        }"
        class="accordion-collapse collapse"
        aria-labelledby=${
          task.title
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
            .split(" ")
            .join("") + task.id.slice(0, 6)
        }"
        data-bs-parent="#accordionFlushExample"
        >
        <div class="accordion-body">
        <div
        class="row justify-content-between align-items-md-center"
        >
        <div class="col-md-auto">
            ${task.content}
        </div>
        <div class="col-sm-auto">
            <!-- Botones -->
            <div class="row justify-content-md-end justify-content-center pt-1">
            <div class="col-md-auto text-center col-5 pe-1">
                <button
                type="button"
                class="btn btn-success"
                id="${task.id}"
                name="complete"
                >
                Completar
                </button>
            </div>
            <div class="col-md-auto text-center col-5 ps-md-1">
                <button
                type="button"
                class="btn btn-danger"
                id="${task.id}"
                name="delete"  
                >
                Eliminar
                </button>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>        
            `;
    listTask.appendChild(element);
    this.pendingAsk();

    const toast = new bootstrap.Toast(document.getElementById("createTask"));
    toast.show();
  }

  resetForm() {
    document.getElementById("task-form").reset();
  }

  pendingAsk() {
    document.getElementById("task-pending").innerText =
      document.getElementsByClassName("accordion-item").length;
  }

  completeTask(complete) {
    document.getElementById("task-complete").innerText = complete;
  }

  deleteTask(element) {
    document.getElementById(element.id).remove();
    this.pendingAsk();
  }

  local(key, element) {
    localStorage.setItem(key, JSON.stringify(element));
  }

  changeData(taskDB, element) {
    taskDB = taskDB.filter((e) => e.id !== element.id);
    this.local("task", taskDB);
    return taskDB;
  }
}
