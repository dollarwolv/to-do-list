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

const domManager = new DOMManager();
domManager.renderTask(firstTask);