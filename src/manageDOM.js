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

        form.appendChild(submit);
        formDiv.appendChild(form);
        document.body.appendChild(formDiv);
        this.form = form;
    }

    killTaskAdder() {
        const formDiv = document.getElementsByClassName("form-div")[0];
        document.body.removeChild(formDiv);
    }
}

export default DOMManager;