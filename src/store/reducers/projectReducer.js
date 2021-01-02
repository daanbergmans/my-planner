const initState = {
    projects: [
        { id: "1", title: "Help me find Peach", content: "Blah blah blah"},
        { id: "2", title: "Collect all the stars", content: "Blah blah blah"},
        { id: "3", title: "Egg hunt with Yoshi", content: "Blah blah blah"}
    ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_PROJECT":
            console.log("Created project", action.project);
            return state;
        case "CREATE_PROJECT_ERROR":
            console.log("Create project error", action.error);
            return state;
        case "DELETE_PROJECT":
            console.log("Deleted project", action.projectId);
            return state;
        case "DELETE_PROJECT_ERROR":
            console.log("Delete project error", action.error);
            return state;
        case "EDIT_PROJECT":
            console.log("Edited project", action.projectId);
            return state;
        case "EDIT_PROJECT_ERROR":
            console.log("Edit project error", action.error);
            return state;
        default:
            return state;
    }       
}

export default projectReducer;