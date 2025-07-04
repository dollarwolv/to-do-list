class toDoItem {
    constructor({title, description, dueDate, priority, ...rest}) {
        this.title = title;
        this.description = description;
        this.doneBool = false;
        this.dueDate = dueDate;
        this.priority = priority;

        Object.assign(this, rest);
    }

    tickItem(){
        this.doneBool = true;
    }
}

export default toDoItem;