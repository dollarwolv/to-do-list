import toDoProject from "./toDoProject";
import "./styles.css";
import DOMManager from "./manageDOM";

class AppController {
    constructor() {
        this.dom = new DOMManager();
        this.projects = [];
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        const addTaskButton = document.getElementById("add-task-container");
        addTaskButton.addEventListener("click", () => this.showForm());
    }

    showForm() {
        console.log("showing form!")
        this.dom.renderTaskAdder();
        this.dom.form.addEventListener("submit", (event) => {
            event.preventDefault();

            // get form data
            const formData = new FormData(this.dom.form);

            // TODO: replace with choosing which project to add to
            const defaultProject = new toDoProject("default");
            defaultProject.createToDo({
                title: formData.get("title"),
                description: formData.get("description"),
                dueDate: formData.get("dueDate"),
                priority: formData.get("priority")
            })

            let task = defaultProject.unfinished[0];
            this.dom.renderTask(task);
            this.dom.killTaskAdder();
        });
    }
}

new AppController();