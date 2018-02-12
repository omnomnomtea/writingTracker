import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProject } from '../store'

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.id)
  }

  render() {
    return (
      <div className="single-project">
        <ul>
          <li>Title: {this.props.project.name}</li>
          <li>Wordcount: {this.props.project.wordcount}</li>
        </ul>
      </div>
    )
  }

}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id))
  }
}

const mapState = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  const project = state.projects.filter(project => project.id = id)[0] || {};
  return {
    project,
    id,
  }
}



export default connect(mapState, mapDispatch)(SingleProject);
