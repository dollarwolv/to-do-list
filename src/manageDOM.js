import editImgSrc from "./img/edit.svg"
import calendarImgSrc from "./img/calendar.svg"


/**
 * Class responsible for managing all DOM-related operations for tasks and projects.
 */
class DOMManager{
    constructor(saveFunction) {
        this.tasksListDiv = document.getElementById("tasks-list");
        this.taskHeading = document.getElementById("tasks-header");
        this.saveFunction = saveFunction
    }
    
    /**
     * Renders a task item into the DOM.
     * @param {Object} task - The task object to render.
     * @returns {HTMLElement} The created task DOM element.
     */
    renderTask(task) {

        const quietMessages = [
        "It's quiet in here... Add your first task!",
        "It's quiet in here... Add your first task to this project!"
        ];

        if (quietMessages.includes(this.tasksListDiv.innerHTML)) {
            this.tasksListDiv.innerHTML = "";
        }

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.dataset.taskId = task.id;

        // create checkbox
        const checkbox = document.createElement("span");
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("click", () => {
            task.tickItem();
            this.tasksListDiv.removeChild(taskDiv);
            if (this.tasksListDiv.innerHTML === ""){
                this.tasksListDiv.innerHTML = "It's quiet in here... Add your first task!";
            }
            this.saveFunction();
            return;
        });

        // create task title
        const taskTitleSpan = document.createElement("span");
        taskTitleSpan.classList.add("task-title");
        taskTitleSpan.textContent = task.title;
        taskTitleSpan.addEventListener("dblclick", () => {
            taskTitleSpan.contentEditable = true;
            taskTitleSpan.focus();
        })
        taskTitleSpan.addEventListener("blur", () => {
            task.title = taskTitleSpan.textContent;
            taskTitleSpan.contentEditable = false;
            this.saveFunction();
            });

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

        // Remove any previous infoDivs
        const oldForm = document.body.querySelector(".form-div");
        if (oldForm) {
            oldForm.remove();
            return;
        }
        
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

        const description = document.createElement("p");
        description.textContent = task.description;
        description.contentEditable = true;
        description.addEventListener("blur", () => {
            task.description = description.textContent;
            this.saveFunction();
            });

        const localeString = task.dueDate.toLocaleDateString();
        const dueDate = document.createElement("p");
        if (localeString != "1/1/1970" || localeString != "Invalid Date"){
            dueDate.textContent = localeString;
        }

        
        const priority = document.createElement("p");
        priority.textContent = task.priority;

        const project = document.createElement("p");
        project.textContent = `Project: ${task.project}`;

        infoDiv.append(description, dueDate, priority, project);

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
     * Renders the list of all projects in the sidebar, keeping the "Add Project" button last.
     * @param {Array} projects - Array of project objects to render.
     */
    renderProjectList(projects) {
        const projectsDiv = document.getElementById("projects-div");

        // Keep removing the first child until only one remains
        while (projectsDiv.children.length > 1) {
        projectsDiv.removeChild(projectsDiv.firstElementChild);
        }
        projectsDiv.classList.toggle("show");


        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.innerHTML = project.projectTitle;
            projectDiv.classList.add("project");
            projectDiv.addEventListener("click", () => this.showProjectTasks(project));
            projectsDiv.insertBefore(projectDiv, projectsDiv.lastElementChild);
        })
        
        if (projects.length > 1){
             const allProjectsDiv = document.createElement("div");
            allProjectsDiv.id = "all-project-container";
            allProjectsDiv.classList.add("project");
            allProjectsDiv.textContent = "Show All Tasks across projects";
            allProjectsDiv.addEventListener("click", () => this.showAllTasks(projects))
            projectsDiv.insertBefore(allProjectsDiv, projectsDiv.lastElementChild);
        }
    }

    /**
     * Shows all tasks related to a particular project.
     * @param {Array} projects - Array of project objects to render.
     */
    showProjectTasks(project){
        this.taskHeading.textContent = project.projectTitle;
        this.tasksListDiv.innerHTML = "";
        project.unfinished.forEach(task => {
            const taskDiv = this.renderTask(task);
            const titleDiv = taskDiv.querySelector(".task-title");
            titleDiv.addEventListener("click", () => this.showTaskInfo(task));
        });
        if(this.tasksListDiv.innerHTML === ""){
            this.tasksListDiv.innerHTML = "It's quiet in here... Add your first task to this project!";
        }
    }

    /**
     * Shows all tasks of all projects.
     * @param {Array} projects - Array of project objects to render.
     */
    showAllTasks(projectList){
        this.taskHeading.textContent = "All Tasks";
        this.tasksListDiv.innerHTML = "";
        projectList.forEach(project => {
            project.unfinished.forEach(task => {
                const taskDiv = this.renderTask(task);
                const titleDiv = taskDiv.querySelector(".task-title");
                titleDiv.addEventListener("click", () => this.showTaskInfo(task));
            });
        });
        if(this.tasksListDiv.innerHTML === ""){
            this.tasksListDiv.innerHTML = "It's quiet in here... Add your first task!";
        }
    }

    showTodaysTasks(projectList){
        this.taskHeading.textContent = "Today's Tasks";
        this.tasksListDiv.innerHTML = "";

        const stripTime = (date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
            };
        const todayDate = new Date();
        const today = stripTime(todayDate);

        projectList.forEach(project => {
            project.unfinished.forEach(task => {
                if(stripTime(task.dueDate).getTime() === today.getTime()){
                    const taskDiv = this.renderTask(task);
                    const titleDiv = taskDiv.querySelector(".task-title");
                    titleDiv.addEventListener("click", () => this.showTaskInfo(task));
                }
            });
        });
        if(this.tasksListDiv.innerHTML === ""){
            this.tasksListDiv.innerHTML = "Nothing due today! 🙌";
        }
    }
}

export default DOMManager;