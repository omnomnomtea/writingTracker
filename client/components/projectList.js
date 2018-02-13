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
        {
          this.props.projects.map(project => <SimpleProject project={project} key={project.id}/>)
        }
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
  return {
    projects,
  }
}

export default connect(mapState, mapDispatch)(ProjectList);
