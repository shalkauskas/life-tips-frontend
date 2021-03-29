export const reduce = (state, action) => {
  switch (action.type) {
    case "OnSuccess":
      return {
        loading: false,
        posts: [...state.posts, ...action.payload],
        error: "",
      };
    case "OnOrderChange":
      return {
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "OnOrderChangeStart":
      return {
        loading: true,
        posts: [],
        error: "",
      };
    case "OnFailure":
      return {
        loading: false,
        posts: [],
        error: "Something went wrong",
      };

    default:
      return state;
  }
};
export const initialState = {
  posts: [],
  loading: true,
  error: "",
};
