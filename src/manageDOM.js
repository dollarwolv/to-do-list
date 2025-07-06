import editImgSrc from "./img/edit.svg"
import calendarImgSrc from "./img/calendar.svg"

class DOMManager{
    constructor() {
        this.tasksListDiv = document.getElementById("tasks-list");
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
}

export default DOMManager;