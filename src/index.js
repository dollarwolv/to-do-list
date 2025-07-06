import toDoProject from "./toDoProject";
import "./styles.css";

const manager = new toDoProject("default");
manager.createToDo({
    title: "this is a amazing todo", 
    description: "fuck this shit", 
    dueDate : "07-11-2002", 
    priority: "high"});
console.log(manager.unfinished)