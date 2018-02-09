import axios from 'axios'

// Action Types
const GET_PROJECT = "GET_PROJECT";
const GET_ALL_PROJECTS = "GET_ALL_PROJECTS";

// Action Creators
export const getProject = (project) => ({ type: GET_PROJECT, project: project })
export const getAllProjects = (projects) => ({ type: GET_ALL_PROJECTS, projects: projects })

// Thunk Creators
export const fetchProject = (id) =>
  dispatch =>
    axios.get(`/api/projects/${id}`)
      .then(res => {
        dispatch(getProject(res.data))
      })
      .catch(err => console.log(err))

export const fetchAllProjects = () =>
  dispatch =>
    axios.get(`/api/projects/`)
      .then(res => {
        dispatch(getAllProjects(res.data))
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
