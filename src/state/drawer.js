// Actions

export const TOGGLE_DRAWER_PINNED = 'TOGGLE_DRAWER_PINNED';
export const TOGGLE_DRAWER_ACTIVE = 'TOGGLE_DRAWER_ACTIVE';
export const TOGGLE_SIDEBAR_PINNED = 'TOGGLE_SIDEBAR_PINNED';

// Reducer

export const initialState = {
  drawerActive: false,
  drawerPinned: false,
  sidebarPinned: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER_PINNED:
      return { ...state, drawerPinned: !state.drawerPinned };
    case TOGGLE_DRAWER_ACTIVE:
      return { ...state, drawerActive: !state.drawerActive };
    case TOGGLE_SIDEBAR_PINNED:
      return { ...state, sidebarPinned: !state.sidebarPinned };
    default:
      return state;
  }
};

// Action Creators

export function toggleDrawerPinned() {
  return { type: TOGGLE_DRAWER_PINNED };
}

export function toggleDrawerActive() {
  return { type: TOGGLE_DRAWER_ACTIVE };
}

export function toggleSidebarPinned() {
  return { type: TOGGLE_SIDEBAR_PINNED };
}

export default reducer;
