import mockData from "../data/mock-data";

// Actions

export const SAVE_EXERCISE = "SAVE_EXERCISE";
export const CREATE_EXERCISE = "CREATE_EXERCISE";


// Reducer

export const initialState = mockData;

function getExercises(data, date) {
  let dateData = data[date];

  if (dateData === undefined) {
    data[date] = { exercises: [] };
    dateData = data[date];
  }

  return dateData.exercises;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EXERCISE: {
      let data = Object.assign({}, state);
      let exercises = getExercises(data, action.date);

      exercises[action.index] = action.exercise;

      return data;
    }

    case CREATE_EXERCISE: {
      let data = Object.assign({}, state);
      let exercises = getExercises(data, action.date);

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
    date: date,
    index: index,
    exercise: exercise,
  }
}

export function createExercise(date, name) {
  return {
    type: CREATE_EXERCISE,
    date: date,
    name: name
  }
}

export default reducer;
