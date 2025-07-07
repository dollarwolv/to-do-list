import editImgSrc from "./img/edit.svg"
import calendarImgSrc from "./img/calendar.svg"


class DOMManager{
    constructor() {
        this.tasksListDiv = document.getElementById("tasks-list");
        // this.actualToDoContainer = document.getElementById("actual-todo-container");
    }
    
    renderTask(task) {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.dataset.taskId = task.id;

        // create checkbox
        const checkbox = document.createElement("span");
        checkbox.classList.add("checkbox");

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

    createImgContainer(imgSrc) {
        const taskImageContainerDiv = document.createElement("div");
        taskImageContainerDiv.classList.add("task-image-container");
        const img =  document.createElement("img");
        img.src = imgSrc;
        img.classList.add("task-image");
        taskImageContainerDiv.appendChild(img);
        return taskImageContainerDiv
    }

    renderTaskAdder() {
        const formDiv = document.createElement("div");
        formDiv.classList.add("form-div");
        const form = document.createElement("form");
        form.id = "task-form";

        const fields = [
            { label: "Title", type: "text", name: "title" },
            { label: "Description", type: "text", name: "description" },
            { label: "Due Date", type: "date", name: "dueDate" },
            { label: "Priority", type: "text", name: "priority" }
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

    killTaskAdder() {
        const formDiv = document.getElementsByClassName("form-div")[0];
        document.body.removeChild(formDiv);
    }

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

        infoDiv.append(title, description, dueDate, priority);
        document.body.appendChild(infoDiv);
    }

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

    // TODO: change this so it doesn't do the same thing that the other thing does
    killProjectAdder() {
        const formDiv = document.getElementsByClassName("form-div")[0];
        if (formDiv) document.body.removeChild(formDiv);
    }

    addProjectToList(title) {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = title;
        const projectsDiv = document.getElementById("projects-div");
        projectsDiv.insertBefore(projectDiv, projectsDiv.lastElementChild);
    }
}

export default DOMManager;