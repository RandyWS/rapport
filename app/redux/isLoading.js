const IS_LOADING = "IS_LOADING";

export const setIsLoading = (isLoading) => {
  return {
    type: IS_LOADING,
    isLoading,
  };
};

export default (state = false, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
};
