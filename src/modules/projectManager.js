// VARIABLES

let projectList = [];
let activeProject;

// CONSTRUCTOR

class Project {
    static lastId = 0;

    constructor(title) {
        this.id = 'pr' + Project.lastId++;
        this.title = title;
        this.tasks = [];
    };
};

// FUNCTIONS

function getLocalProjectList() {
    const localProjectList = JSON.parse(
        localStorage.getItem('projects')
    );

    if (localProjectList != null) {
        projectList = localProjectList;
    };
};

function setLocalProjectList() {
    localStorage.setItem(
        'projects', JSON.stringify(projectList)
    );
};

function getLocalProjectId() {
    const localProjectId = JSON.parse(
        localStorage.getItem('projectLastId')
    );

    if (localProjectId != null) {
        Project.lastId = localProjectId;
    };
};

function setLocalProjectId() {
    localStorage.setItem(
        'projectLastId', JSON.stringify(Project.lastId)
    );
};

function getLocalActiveProject() {
    const localActiveProject = JSON.parse(
        localStorage.getItem('activeProject')
    );

    if (localActiveProject != null) {
        activeProject = localActiveProject;
    };
};

function setLocalActiveProject() {
    localStorage.setItem(
        'activeProject', JSON.stringify(activeProject)
    );
};

function setActiveProject(id) {
    const index = projectList.findIndex(
        project => project.id === id
    );

    activeProject = projectList[index];
};

function newProject(title) {
    const project = new Project(title);

    projectList.push(project);

    setLocalProjectList();

    setLocalProjectId();

    setActiveProject(project.id);

    setLocalActiveProject();
};

function deleteProject(id) {
    const index = projectList.findIndex(
        project => project.id === id
    );

    projectList.splice(index, 1);

    if (projectList[index-1] != undefined) {
        activeProject = projectList[index-1];
    } else  if (projectList.length != 0) {
        activeProject = projectList[index];
    } else {
        activeProject = null;
    }

    setLocalActiveProject();

    setLocalProjectList();
}

// EXPORT

export {
    projectList,
    activeProject,
    newProject,
    setActiveProject,
    getLocalProjectList,
    setLocalProjectList,
    getLocalProjectId,
    setLocalProjectId,
    getLocalActiveProject,
    setLocalActiveProject,
    deleteProject,
    Project
};