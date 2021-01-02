import React, { Component } from 'react';
import { connect } from "react-redux";
import { editProject } from "../../store/actions/projectActions";

class EditProject extends Component {    
    constructor(props) {
        super(props);

        this.state = { 
            title: props.title,
            content: props.content,
            errors: []
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let tempErrors = [];

        if (this.state.title === "") {
            tempErrors.push("A title is required!");
        }

        if (this.state.content === "") {
            tempErrors.push("A content is required!");
        }

        if (tempErrors.length > 0) {
            this.setState({
                errors: tempErrors
            })
        } else if (tempErrors.length === 0) {
            this.props.editProject(this.props.match.params.id, { title: this.state.title, content: this.state.content });
            this.props.history.push("/");
        }
    }

    render() {
        console.log(this.props);

        return (
            <div className="container">
                <form className="white" onSubmit={ this.handleSubmit }>
                    <h5 className="grey-text text-darken-3">Edit project</h5>
                    <div className="input-field">
                        <label htmlFor="title" className="active">Title</label>
                        <input type="text" id="title" value={ this.state.title } onChange={ this.handleChange } />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" className="active">Content</label>
                        <textarea id="content" className="materialize-textarea" value={ this.state.content } onChange={ this.handleChange }></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Edit</button>
                    </div>
                    <div>
                        <p className="center red-text">
                            { 
                                this.state.error ? <p>this.state.error</p> : null 
                            }
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const project = state.firestore.data.selectedProject
    
    return {
        title: project.title,
        content: project.content
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProject: (projectId, newProject) => dispatch(editProject(projectId, newProject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject)

