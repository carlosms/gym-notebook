import mockData from '../data/mock-data';

// Actions

export const SAVE_EXERCISE = 'SAVE_EXERCISE';
export const CREATE_EXERCISE = 'CREATE_EXERCISE';

export const initialState = mockData;

// Helpers

/* eslint-disable no-param-reassign */
function initDay(state, date) {
  if (state[date] === undefined) {
    state[date] = {
      exercises: [],
    };
  }
}

function getExercisesFromState(state, date) {
  initDay(state, date);
  return state[date].exercises;
}

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EXERCISE: {
      const data = Object.assign({}, state);
      const exercises = getExercisesFromState(data, action.date);

      exercises[action.index] = action.exercise;

      return data;
    }

    case CREATE_EXERCISE: {
      const data = Object.assign({}, state);

      initDay(data, action.date);

      const exercises = getExercisesFromState(data, action.date);

      exercises.push({ name: action.name, sets: [] });

      return data;
    }

    default:
      return state;
  }
};

// Action Creators

export function saveExercise(date, index, exercise) {
  return {
    type: SAVE_EXERCISE,
    date,
    index,
    exercise,
  };
}

export function createExercise(date, name) {
  return {
    type: CREATE_EXERCISE,
    date,
    name,
  };
}

// Selectors

export function getExercises(state, date) {
  const currDateData = state[date];
  return currDateData !== undefined ? currDateData.exercises : [];
}

export function getExercise(state, date, index) {
  return getExercises(state, date)[index];
}

export default reducer;
