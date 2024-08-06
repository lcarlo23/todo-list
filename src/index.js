// todos are objects, factories/constructors/classes? (classes)
// should have title, description, dueDate, priority, notes, checklist.
// should have projects or separate lists of todos. one default project on opening the app
// should be able to create projects and choose wich projects todos go into
// should separate application logic from the DOM, separate modules.

import 'normalize.css';
import './style.css';
import { initializeEvents } from './modules/eventHandlers';
import { deleteProject, Project, projectList } from './modules/projectManager';

window.addEventListener('DOMContentLoaded', initializeEvents);

window.deleteProject = deleteProject;
window.projectList = projectList;