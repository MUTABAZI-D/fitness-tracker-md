export const selectIsAuthenticated = (state) =>
  state.authReducer.isAuthenticated;

export const selectIsLoading = (state) => state.authReducer.isLoading;
