export const initialState = {
  User: {
    id: "",
    isAuthenticated: false,
    displayName: "",
    photoUrl: "",
    username: "",
  },
};

export const reduce = (state, action) => {
  switch (action.type) {
    case "OnLogin":
      return {
        ...state,
        User: {
          isAuthenticated: action.payload.isAuthenticated,
          displayName: action.payload.displayName,
          id: action.payload.id,
          photoUrl: action.payload.photoUrl,
          username: action.payload.username,
        },
      };
    case "CheckAuth":
      return {
        ...state,
        User: { ...state.User, isAuthenticated: action.payload },
      };
    case "OnLogout": {
      return initialState;
    }
    default:
      return state;
  }
};
