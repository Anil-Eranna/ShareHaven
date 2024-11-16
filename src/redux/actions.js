export const SET_IMAGE = "SET_IMAGE";

// Action to set the image in Redux store
export const setImage = (file) => ({
  type: SET_IMAGE,
  payload: file,
});