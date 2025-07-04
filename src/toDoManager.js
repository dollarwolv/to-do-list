import toDoItem from "./toDoItem";

class toDoManager {
    constructor() {
        this.items = []
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

export default toDoManager;