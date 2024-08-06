// IMPORT

import {
    projectList,
    activeProject,
    setActiveProject,
    newProject,
    setLocalActiveProject,
    deleteProject,
    Project
} from "./projectManager";
import {
    projectsListDiv,
    tasksListDiv,
    newTaskModal,
    newProjectModal,
    body
} from "./domElements";
import { newTask, deleteTask } from "./taskManager";
import deleteImg from '../assets/images/delete.svg';

// UPDATE DOM

function createDefaultTemplate() {if (
        projectList.length === 0 &&
        Project.lastId === 0
    ) {
        newProject('Example Project');
        newTask(
            'Example Task',
            'this is a simple example description',
            '10-01-2024'
        );
    };
}

function updateProjectList() {
    projectsListDiv.textContent = '';

    projectList.map(
        (project) => {
            const div = document.createElement('div');
            const p = document.createElement('p');
            const img = document.createElement('img');

            div.setAttribute('pr-id', project.id);
            div.classList.add('project');
            p.textContent = project.title;
            img.src = deleteImg;
            img.classList.add('delete');

            div.appendChild(p);
            div.appendChild(img);
            projectsListDiv.appendChild(div);
        }
    );
};

function updateTaskList() {
    tasksListDiv.textContent = '';
    
    if (projectList.length > 0) {
        const taskList = activeProject.tasks;
        
        taskList.map(
            (task) => {
                const div = document.createElement('div');
                const div2 = document.createElement('div');
                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                const p3 = document.createElement('p');
                const img = document.createElement('img');
    
                div.classList.add('task');
                div.setAttribute('ts-id', task.id);
                p1.textContent = task.title;
                p1.classList.add('task-title');
                img.src = deleteImg;
                img.classList.add('delete');
                
                if (task.dueDate != '') {
                    p2.textContent = 'Due Date: ';
                    p2.classList.add('task-due-date');
                    p3.textContent = task.dueDate;
                    div2.appendChild(p2);
                    div2.appendChild(p3);
                };
    
                div.appendChild(p1);
                div.appendChild(div2);
                div.appendChild(img);
                tasksListDiv.appendChild(div);
            }
        );
    }
};

function showNewProjectModal() {
    newProjectModal.classList.toggle('modal-hide');
    newProjectModal.classList.toggle('modal-show');
};

function showNewTaskModal() {
    if (projectList.length != 0) {
        newTaskModal.classList.toggle('modal-hide');
        newTaskModal.classList.toggle('modal-show');
    } else {
        alert('You need to create at least one Project to create a task');
    }
};

function toggleTaskModal(e) {
    if (e.target.id.includes('taskModalts')) {
        e.target.remove();
    }
}

// INTERACTIONS

function selectProject(e) {
    let target = e.target;

    while (target && !target.hasAttribute('pr-id')) {
        target = target.parentElement;
    };

    if (target != null) {
        const projectId = target.getAttribute('pr-id');

        setActiveProject(projectId);

        setLocalActiveProject();

        updateTaskList();
    };
};

function createProject() {
    const projectName = document.getElementById('projectName').value;

    newProject(projectName);

    updateProjectList();

    updateTaskList();

    showNewProjectModal();
};

function createTask() {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');

    if (taskTitle == '') {
        alert('To create a Task you need to input the Title');
    } else {
        newTask(taskTitle.value, taskDescription.value, dueDate.value, priority.value);
        taskTitle.value = '';
        taskDescription.value = '';
        dueDate.value = '';
        priority.value = 'standard';
        
    }

    updateTaskList();
    showNewTaskModal();
};

function cancelProjectModal(e) {
    const target = e.target;

    if (
        target.classList.contains('modal-show') ||
        target.id === 'cancelProjectBtn'
    ) {
        showNewProjectModal();
    }
};

function cancelTaskModal(e) {
    const target = e.target;

    if (
        target.classList.contains('modal-show') ||
        target.id === 'cancelTaskBtn'
    ) {
        showNewTaskModal();
    }
};

function removeProject(e) {
    let target = e.target;

    if (target.classList.contains('delete')) {
        while (target && !target.hasAttribute('pr-id')) {
            target = target.parentElement;
        };
        const projectId = target.getAttribute('pr-id');

        deleteProject(projectId);

        updateProjectList();

        updateTaskList();
    }
};

function removeTask(e) {
    let target = e.target;

    if (target.classList.contains('delete')) {
        while (target && !target.hasAttribute('ts-id')) {
            target = target.parentElement;
        };
        const taskId = target.getAttribute('ts-id');

        deleteTask(taskId);

        updateTaskList();
    }
};

function createTaskModal(e) {
    let target = e.target;

    while (target && !target.hasAttribute('ts-id')) {
        target = target.parentElement;
    };

    if (
        target != null &&
        !e.target.classList.contains('delete')
    ) {
        const taskList = activeProject.tasks;
        const taskId = target.getAttribute('ts-id');
        const taskIndex = taskList.findIndex(
            task => task.id === taskId
        );
        const task = taskList[taskIndex];

        const container = document.createElement('div');
        const modal = document.createElement('div');
        const title = document.createElement('p');
        const desc = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');

        container.id = 'taskModal' + task.id;
        container.classList.add('modal-show');
        modal.classList.add('modal');
        title.textContent = 'Title: ' + task.title;
        desc.textContent = `Description:
                            ${task.description}`;
        dueDate.textContent = 'Due Date: ' + task.dueDate;
        priority.textContent = 'Priority: ' + task.priority;

        modal.append(title, desc, dueDate, priority);
        container.appendChild(modal);
        body.prepend(container);

        container.addEventListener('click', toggleTaskModal);
    };
};

function closeTaskModal(e) {

};

// EXPORT

export {
    updateProjectList,
    updateTaskList,
    selectProject,
    showNewProjectModal,
    createProject,
    showNewTaskModal,
    createTask,
    cancelProjectModal,
    cancelTaskModal,
    removeProject,
    removeTask,
    createDefaultTemplate,
    createTaskModal,
    closeTaskModal
};