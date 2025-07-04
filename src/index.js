import toDoManager from "./toDoManager";

const manager = new toDoManager();
manager.createToDo("this is a amazing todo", "fuck this shit", "07-11-2002", "high");
console.log(manager.unfinished)