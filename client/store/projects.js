import axios from 'axios'

// Action Types
const GET_PROJECT = "GET_PROJECT";
const GET_ALL_PROJECTS = "GET_ALL_PROJECTS";

// Action Creators
export const getProject = (project) => ({ type: GET_PROJECT, project: project })
export const getAllProjects = (projects) => ({ type: GET_ALL_PROJECTS, project: projects })

// Thunk Creators
export const projectGetter = (id) =>
  dispatch =>
    axios.get(`/api/projects/${id}`)
      .then(project => {
        dispatch(getProject(project))
      })
      .catch(err => console.log(err))

export const allProjectsGetter = () =>
  dispatch =>
    axios.get(`/api/projects/`)
      .then(projects => {
        dispatch(getAllProjects(projects))
      })
      .catch(err => console.log(err))

// Default state
const defaultState = [];

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return action.projects;
    case GET_PROJECT:
      return [...state, action.project];
    default:
      return state;
  }
}
