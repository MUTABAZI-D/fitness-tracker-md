export const selectIsAuthenticated = (state) =>
  state.authReducer.isAuthenticated;

export const selectIsAuthChecked = (state) => state.authReducer.isAuthChecked;
