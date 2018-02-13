import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllProjects } from '../store'
import { SimpleProject, SvgGraph } from './index'

class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.projects.length && !nextProps.projects.length && !this.state.loaded) {
      this.props.fetchProjects()
      this.setState({ loaded: true })
    }
  }

  componentDidMount() {
    this.props.fetchProjects();
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div className="project-list">
        <div className="project-list-summary">
          <h4>Your Projects: ({this.props.totalWordcount} words total)</h4>
        </div>
        <ul>
          {
            this.props.projects.map(project => (
              <li key={project.id}>
                <SimpleProject project={project} key={project.id} />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

}


const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchProjects: () => dispatch(fetchAllProjects())
  }
}

const mapState = (state, ownProps) => {
  const projects = state.projects;
  const totalWordcount = state.projects.reduce((acc, project) => {
    return acc + project.wordcount;
  }, 0)
  return {
    projects,
    totalWordcount
  }
}

export default connect(mapState, mapDispatch)(ProjectList);
