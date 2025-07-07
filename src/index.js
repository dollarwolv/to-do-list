import toDoProject from "./toDoProject";
import "./styles.css";
import DOMManager from "./manageDOM";

class AppController {
    constructor() {
        this.dom = new DOMManager()
        this.init();
        this.defaultProject = new toDoProject("default");
        this.projects = [this.defaultProject];
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        const addTaskButton = document.getElementById("add-task-container");
        addTaskButton.addEventListener("click", () => this.handleTaskForm());

        const showProjectsButton = document.getElementById("show-project-container");
        showProjectsButton.addEventListener("click", () => this.dom.renderProjectList(this.projects));

        const addProjectsButton = document.getElementById("add-project-container");
        addProjectsButton.addEventListener("click", () => this.handleProjectForm());
    }

    handleTaskForm() {
        this.dom.renderTaskAdder(this.projects);
        this.dom.taskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // get form data and add task
            const formData = new FormData(this.dom.taskForm);
            this.addTask(formData);
            this.dom.killTaskAdder();
        });
    }

    addTask(formData) {

        const project = this.projects.find((element) => element.projectTitle === formData.get("project"));
        const task = project.createToDo({
            title: formData.get("title"),
            description: formData.get("description"),
            dueDate: formData.get("dueDate"),
            priority: formData.get("priority"),
            project: project.projectTitle,
        });

        // TODO: make it so you can look up task via task ID
        const taskDiv = this.dom.renderTask(task);
        taskDiv.addEventListener("click", () => this.dom.showTaskInfo(task));
    }

    handleProjectForm() {
        this.dom.renderProjectAdder();
        this.dom.projectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // get form data and add task
            const formData = new FormData(this.dom.projectForm);
            this.addProject(formData);
            this.dom.killProjectAdder();
        });
    }

    addProject(formData) {
        const project = new toDoProject(formData.get("projectName"));
        this.projects.push(project);
        this.dom.addProjectToList(formData.get("projectName"));

        console.log(this.projects);
    }
}

new AppController();