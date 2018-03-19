// Actions

export const CURRENT_DATE_ADD = 'CURRENT_DATE_ADD';
export const CURRENT_DATE_SET = 'CURRENT_DATE_SET';

// Helpers

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

// Reducer

export const initialState = '2018-01-23';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_DATE_ADD: {
      const d = new Date(state);
      d.setDate(d.getDate() + action.n);
      return formatDate(d);
    }
    case CURRENT_DATE_SET:
      return action.date;

    default:
      return state;
  }
};

// Action Creators

export function currDateChange(n) {
  return { type: CURRENT_DATE_ADD, n };
}

export function currDateSet(date) {
  return { type: CURRENT_DATE_SET, date };
}

export default reducer;
