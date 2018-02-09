import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProject} from '../store'

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.id)
  }

  render () {
    return (
      <div>
        Title: {this.props.project.name}
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
  return {
    project: state.projects.filter(project => project.id = id)[0] || {},
    id,
  }
}



export default connect(mapState, mapDispatch)(SingleProject);
