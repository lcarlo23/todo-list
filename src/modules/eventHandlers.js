// IMPORT

import {
    newProjectBtn,
    createProjectBtn,
    newTaskBtn,
    createTaskBtn,
    projectsListDiv,
    tasksListDiv,
    newProjectModal,
    newTaskModal
} from './domElements';
import {
    updateProjectList,
    updateTaskList,
    showNewTaskModal,
    selectProject,
    showNewProjectModal,
    createProject,
    createTask,
    cancelProjectModal,
    cancelTaskModal,
    removeProject,
    removeTask,
    createDefaultTemplate,
    createTaskModal
} from './domFunctions';
import {
    getLocalProjectList,
    getLocalProjectId,
    getLocalActiveProject,
} from './projectManager';
import { getLocalTaskId } from './taskManager';

// FUNCTIONS

function initializeEvents() {
    getLocalProjectId();

    getLocalProjectList();

    getLocalActiveProject();

    getLocalTaskId();

    createDefaultTemplate();

    updateProjectList();

    updateTaskList();

    newProjectBtn.addEventListener('click', showNewProjectModal);

    createProjectBtn.addEventListener('click', createProject);

    newProjectModal.addEventListener('click', cancelProjectModal);

    projectsListDiv.addEventListener('click', selectProject);

    projectsListDiv.addEventListener('click', removeProject);

    newTaskBtn.addEventListener('click', showNewTaskModal);

    createTaskBtn.addEventListener('click', createTask);

    newTaskModal.addEventListener('click', cancelTaskModal);

    tasksListDiv.addEventListener('click', removeTask);

    tasksListDiv.addEventListener('click', createTaskModal);
};

// EXPORT

export { initializeEvents };