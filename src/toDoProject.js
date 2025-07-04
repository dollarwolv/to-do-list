import toDoItem from "./toDoItem";

class toDoProject {
    constructor(projectTitle) {
        this.items = [];
        this.projectTitle = projectTitle;
    }

    get finished() {
        return this.items.filter(item => item.doneBool);
    }

    get unfinished() {
        return this.items.filter(item => !item.doneBool);
    }
    
    createToDo(attributes) {
        const toDo = new toDoItem(attributes);
        this.items.push(toDo);
    }
}

export default toDoProject;