import editImgSrc from "./img/edit.svg"
import calendarImgSrc from "./img/calendar.svg"


/**
 * Class responsible for managing all DOM-related operations for tasks and projects.
 */
class DOMManager{
    constructor() {
        this.tasksListDiv = document.getElementById("tasks-list");
    }
    
    /**
     * Renders a task item into the DOM.
     * @param {Object} task - The task object to render.
     * @returns {HTMLElement} The created task DOM element.
     */
    renderTask(task) {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.dataset.taskId = task.id;

        // create checkbox
        const checkbox = document.createElement("span");
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("click", () => {
            task.tickItem();
            this.tasksListDiv.removeChild(taskDiv);
            return;
        });

        // create task title
        const taskTitleSpan = document.createElement("span");
        taskTitleSpan.classList.add("task-title");
        taskTitleSpan.textContent = task.title;

        // create images container
        const taskImagesContainerDiv = document.createElement("div");
        taskImagesContainerDiv.classList.add("task-images-container");

        // create edit/container images
        const editContainer = this.createImgContainer(editImgSrc);
        const calendarContainer = this.createImgContainer(calendarImgSrc);

        // append everything
        taskImagesContainerDiv.append(editContainer, calendarContainer);
        taskDiv.append(checkbox, taskTitleSpan, taskImagesContainerDiv);
        this.tasksListDiv.appendChild(taskDiv);
        return taskDiv;

    }

    /**
     * Creates a div element containing an image used for task actions.
     * @param {string} imgSrc - The source path of the image.
     * @returns {HTMLElement} The container div with the image.
     */
    createImgContainer(imgSrc) {
        const taskImageContainerDiv = document.createElement("div");
        taskImageContainerDiv.classList.add("task-image-container");
        const img =  document.createElement("img");
        img.src = imgSrc;
        img.classList.add("task-image");
        taskImageContainerDiv.appendChild(img);
        return taskImageContainerDiv
    }

    /**
     * Renders a form that allows the user to add a new task.
     * @param {Array} projects - List of existing projects to associate the task with.
     */
    renderTaskAdder(projects) {
        const formDiv = document.createElement("div");
        formDiv.classList.add("form-div");
        const form = document.createElement("form");
        form.id = "task-form";

        const fields = [
            { label: "Title", type: "text", name: "title" },
            { label: "Description", type: "text", name: "description" },
            { label: "Due Date", type: "date", name: "dueDate" },
            { label: "Priority", type: "text", name: "priority" },
        ];

        fields.forEach(field => {
            const label = document.createElement("label");
            label.textContent = field.label;
            label.setAttribute("for", field.name);

            const input = document.createElement("input");
            input.type = field.type;
            input.name = field.name;
            input.id = field.name;

            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(document.createElement("br"));
        });

        const label = document.createElement("label");
        label.textContent = "Choose a project:";
        label.setAttribute("for", "projects");

        const select = document.createElement("select");
        select.name = "project";
        select.id = "project";

        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.projectTitle;
            option.textContent = project.projectTitle;
            select.appendChild(option);
        })

        form.append(label, select, document.createElement("br"));

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Add Task";

        // X button + event listener
        const X = document.createElement("span");
        X.textContent = "X";
        X.classList.add("x");
        X.addEventListener("click", () => this.killTaskAdder());

        form.appendChild(submit);
        formDiv.append(form, X);
        document.body.appendChild(formDiv);
        this.taskForm = form;
    }

    /**
     * Removes the task adder form from the DOM.
     */
    killTaskAdder() {
        const formDiv = document.getElementsByClassName("form-div")[0];
        document.body.removeChild(formDiv);
    }

    /**
     * Displays additional task information below the selected task.
     * If already displayed, toggles it off.
     * @param {Object} task - The task object whose information is shown.
     */
    showTaskInfo(task) {
        // TODO: make it so you can look up task via task ID
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("task-info");

        const title = document.createElement("p");
        title.textContent = `Title: ${task.title}`;

        const description = document.createElement("p");
        description.textContent = `Description: ${task.description}`;

        const dueDate = document.createElement("p");
        dueDate.textContent = `Due Date: ${task.dueDate}`;

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${task.priority}`;

        const project = document.createElement("p");
        project.textContent = `Project: ${task.project}`;

        infoDiv.append(title, description, dueDate, priority, project);

        const taskDiv = document.querySelector(`[data-task-id="${task.id}"]`);

        // Remove any previous infoDivs
        const oldInfo = taskDiv.parentNode.querySelector(".task-info");
        if (oldInfo) {
            oldInfo.remove();
            return;
        }
        
        // Insert after the task
        taskDiv.parentNode.insertBefore(infoDiv, taskDiv.nextSibling);
    }

    /**
     * Renders a form that allows the user to add a new project.
     */
    renderProjectAdder() {
        const formDiv = document.createElement("div");
        formDiv.classList.add("form-div");
        const form = document.createElement("form");
        form.id = "project-form";

        const label = document.createElement("label");
        label.textContent = "Project Name";
        label.setAttribute("for", "projectName");

        const input = document.createElement("input");
        input.type = "text";
        input.name = "projectName";
        input.id = "projectName";

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Add Project";

        // X button + event listener
        const X = document.createElement("span");
        X.textContent = "X";
        X.classList.add("x");
        X.addEventListener("click", () => this.killProjectAdder());

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
        form.appendChild(submit);

        formDiv.append(form, X);
        document.body.appendChild(formDiv);
        this.projectForm = form;
    }

    /**
     * Removes the project adder form from the DOM.
     */
    // TODO: change this so it doesn't do the same thing that the other thing does
    killProjectAdder() {
        const formDiv = document.getElementsByClassName("form-div")[0];
        if (formDiv) document.body.removeChild(formDiv);
    }

    /**
     * Adds a new project element to the project list in the DOM.
     * @param {string} title - Title of the project to add.
     */
    addProjectToList(title) {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = title;
        const projectsDiv = document.getElementById("projects-div");
        projectsDiv.insertBefore(projectDiv, projectsDiv.lastElementChild);
    }

    /**
     * Renders the list of all projects, keeping the "Add Project" button last.
     * @param {Array} projects - Array of project objects to render.
     */
    renderProjectList(projects) {
        const projectsDiv = document.getElementById("projects-div");

        // Keep removing the first child until only one remains
        while (projectsDiv.children.length > 1) {
        projectsDiv.removeChild(projectsDiv.firstElementChild);
        }

        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.innerHTML = project.projectTitle;
            projectDiv.classList.add("project");
            projectsDiv.insertBefore(projectDiv, projectsDiv.lastElementChild);
        })
        projectsDiv.classList.toggle("show");
        
    }
}

export default DOMManager;