// IMPORT

import { activeProject, setLocalActiveProject, setLocalProjectList } from "./projectManager";

// CONSTRUCTOR

class Task {
    static lastId = 0;

    constructor(
        title,
        description,
        dueDate,
        priority,
    ) {        
        this.id = 'ts' + Task.lastId++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        
    };
};

// FUNCTIONS
function getLocalTaskId() {
    const localTaskId = JSON.parse(
        localStorage.getItem('TaskLastId')
    );

    if (localTaskId != null) {
        Task.lastId = localTaskId;
    };
};

function setLocalTaskId() {
    localStorage.setItem(
        'TaskLastId', JSON.stringify(Task.lastId)
    );
};

function newTask(
    title,
    description = '',
    dueDate = '',
    priority = 'standard'
) {
    const taskList = activeProject.tasks;
    const task = new Task(title, description, dueDate, priority);

    taskList.push(task);

    setLocalProjectList();

    setLocalActiveProject();

    setLocalTaskId();
};

function deleteTask(id) {
    const taskList = activeProject.tasks;

    const index = taskList.findIndex(
        task => task.id === id
    );

    taskList.splice(index, 1);

    setLocalProjectList();

    setLocalActiveProject();
}

// EXPORT

export { newTask, getLocalTaskId, deleteTask };