export const initialStore = () => ({
  isAuthenticated: false,
  user: null,
  token: null,
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "login":
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "logout":
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      return {
        ...store,
        token: null,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw Error("Unknown action.");
  }
}