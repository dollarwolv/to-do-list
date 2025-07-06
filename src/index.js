import toDoProject from "./toDoProject";
import "./styles.css";
import DOMManager from "./manageDOM";

class AppController {
    constructor() {
        this.dom = new DOMManager();
        this.projects = [];
        this.init();
        this.defaultProject = new toDoProject("default");
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        const addTaskButton = document.getElementById("add-task-container");
        addTaskButton.addEventListener("click", () => this.showForm());
    }

    showForm() {
        this.dom.renderTaskAdder();
        this.dom.form.addEventListener("submit", (event) => {
            event.preventDefault();

            // get form data and add task
            const formData = new FormData(this.dom.form);
            this.addTask(formData);
            this.dom.killTaskAdder();
        });
    }

    addTask(formData) {

        // TODO: replace with choosing which project to add to
        this.defaultProject.createToDo({
            title: formData.get("title"),
            description: formData.get("description"),
            dueDate: formData.get("dueDate"),
            priority: formData.get("priority")
        });
        const task = this.defaultProject.unfinished.at(-1);
        const taskDiv = this.dom.renderTask(task);
        taskDiv.addEventListener("click", () => this.dom.showTaskInfo(task));
    }
}

new AppController();