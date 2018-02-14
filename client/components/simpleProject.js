import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const SimpleProject = (props) => {
  const { project } = props;
  return (
    <Link to={`/projects/${project.id}`} >
      <div className="single-project">
      <span className="title">{project.name}</span> <span className="wordcount">{project.wordcount} words</span>
      </div>
    </Link>
  )

}

export default SimpleProject
