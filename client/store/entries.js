import axios from 'axios';

// Action types
const GET_ENTRIES = 'GET_ENTRIES';

// Action creaters
const getEntries = (entries) => {
  return {
    type: GET_ENTRIES,
    entries,
  }
}

// Thunks
export const fetchEntries = () =>
  dispatch =>
    axios.get(`/api/entries/all`)
      .then(res => {
        dispatch(getEntries(res.data))
      })
      .catch(err => console.log(err))


// Default state
const defaultEntries = [];

// Reducer
export default function reducer(prevState = defaultEntries, action) {
  switch (action.type) {
    case GET_ENTRIES:
      return action.entries;
    default:
      return prevState;
  }
}
