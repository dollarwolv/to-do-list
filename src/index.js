import toDoProject from "./toDoProject";
import "./styles.css";
import DOMManager from "./manageDOM";

/**
 * Controls the overall application logic, including DOM updates and task/project management.
 */
class AppController {
    /**
     * Initializes the AppController by setting up DOM manager, default project, and attaching event listeners.
     */
    constructor() {
        this.dom = new DOMManager()
        this.defaultProject = new toDoProject("Home 🏠");
        this.projects = [this.defaultProject];
        this.init();
    }

    /**
     * Initializes application event listeners.
     */
    init() {
        this.attachEventListeners();
        this.dom.showProjectTasks(this.defaultProject);
    }

    /**
     * Attaches event listeners to UI buttons for adding tasks and projects, and displaying projects.
     */
    attachEventListeners() {
        const addTaskButton = document.getElementById("add-task-container");
        addTaskButton.addEventListener("click", () => this.handleTaskForm());

        const showProjectsButton = document.getElementById("show-project-container");
        showProjectsButton.addEventListener("click", () => this.dom.renderProjectList(this.projects));

        const addProjectsButton = document.getElementById("add-project-container");
        addProjectsButton.addEventListener("click", () => this.handleProjectForm());

        const todayButton = document.getElementById("today-container");
        todayButton.addEventListener("click", () => this.dom.showTodaysTasks(this.projects));
    }

    /**
     * Renders the task adder form and sets up its submit handler.
     */
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

    /**
     * Creates a new task from form data and appends it to the relevant project.
     * @param {FormData} formData - The submitted task data.
     */
    addTask(formData) {
        const project = this.projects.find((element) => element.projectTitle === formData.get("project"));
        const task = project.createToDo({
            title: formData.get("title"),
            description: formData.get("description"),
            dueDate: new Date(formData.get("dueDate")),
            priority: formData.get("priority"),
            project: project.projectTitle,
        });

        console.log(typeof task.dueDate);

        // // TODO: make it so you can look up task via task ID
        // const taskDiv = this.dom.renderTask(task);
        // const titleDiv = taskDiv.querySelector(".task-title");
        // titleDiv.addEventListener("click", () => this.dom.showTaskInfo(task));

        this.dom.showProjectTasks(project);
    }

    /**
     * Renders the project adder form and sets up its submit handler.
     */
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

    /**
     * Creates a new project and adds it to the project list.
     * @param {FormData} formData - The submitted project data.
     */
    addProject(formData) {
        const project = new toDoProject(formData.get("projectName"));
        this.projects.push(project);
        this.dom.renderProjectList(this.projects);
        this.dom.showProjectTasks(project);
    }
}

new AppController();