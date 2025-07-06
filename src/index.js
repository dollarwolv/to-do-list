import toDoProject from "./toDoProject";
import "./styles.css";
import DOMManager from "./manageDOM";

const manager = new toDoProject("default");
manager.createToDo({
    title: "this is a amazing todo", 
    description: "fuck this shit", 
    dueDate : "07-11-2002", 
    priority: "high"});
console.log(manager.unfinished)

let firstTask = manager.unfinished[0];
console.log(firstTask);

let projects = [];

const dom = new DOMManager();
dom.renderTask(firstTask);
dom.renderTaskAdder();
dom.form.addEventListener("submit", (event) => {
    event.preventDefault();

    // get form data
    const formData = new FormData(dom.form);

    // TODO: replace with choosing which project to add to
    const defaultProject = new toDoProject("default");
    defaultProject.createToDo({
        title: formData.get("title"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        priority: formData.get("priority")
    })

    let task = defaultProject.unfinished[0];
    dom.renderTask(task);
})