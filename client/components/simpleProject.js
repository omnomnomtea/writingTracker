import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const SimpleProject = (props) => {
  const { project } = props;
  return (
    <div className="single-project">
      <Link to={`/projects/${project.id}`} >{project.name}</Link>
      <span>Wordcount: {project.wordcount}</span>
    </div>
  )
}

export default SimpleProject
