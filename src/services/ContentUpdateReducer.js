export const reduce = (state, action) => {
  switch (action.type) {
    case "OnSuccess":
      return {
        loading: false,
        posts: action.payload,
        error: "",
        message: state.message,
        refresh: false,
        alert: state.alert,
      };
    case "OnFailure":
      return {
        loading: false,
        posts: [],
        refresh: false,
        error: "Something went wrong",
        message: "Something went wrong",
        alert: true,
      };
    case "OnUpdate":
      return {
        posts: [],
        loading: true,
        error: "",
        refresh: true,
        message: action.payload,
        alert: true,
      };
    case "OnAlert":
      return {
        posts: state.posts,
        loading: false,
        error: "",
        refresh: false,
        message: "",
        alert: action.payload,
      };
    default:
      return state;
  }
};
export const initialState = {
  posts: [],
  loading: true,
  error: "",
  refresh: false,
  message: "",
  alert: false,
};
