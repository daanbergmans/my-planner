import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { deleteProject } from "../../store/actions/projectActions";
import { Link } from "react-router-dom";

class ProjectDetails extends Component {
    deleteCurrentProject = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            const currentProjectId = this.props.match.params.id;
            this.props.deleteProject(currentProjectId);
            this.props.history.push("/");
        }
    }
    
    render() {
        const { project, auth } = this.props;
        const projectId = this.props.match.params.id;

        if (!auth.uid) return <Redirect to="/signin" />

        if (project) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <div>
                                <span className="card-title">{ project.title }</span>
                            </div>
                            <p>{ project.content }</p>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by { project.authorFirstName } { project.authorLastName }</div>
                            <div>{ moment(project.createdAt.toDate()).calendar() }</div>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <Link className="btn-floating btn-small waves-effect waves-light blue button-margin" to={ "/edit/" + projectId } key={ projectId }><i className="material-icons">edit</i></Link>
                            <button className="btn-floating btn-small waves-effect waves-light red" onClick={ this.deleteCurrentProject }><i className="material-icons">delete</i></button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    return {
        project: project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteProject: (projectId) => dispatch(deleteProject(projectId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: "projects", doc: props.match.params.id, storeAs: "selectedProject" }
    ])
)(ProjectDetails);