class toDoItem {
    constructor({title, description, dueDate, priority, ...rest}) {
        this.title = title;
        this.description = description;
        this.doneBool = false;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

        Object.assign(this, rest);
    }

    tickItem(){
        this.doneBool = true;
    }
}

export default toDoItem;