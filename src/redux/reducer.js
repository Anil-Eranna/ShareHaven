import { SET_IMAGE } from "./actions";

const initialState = {
  imageFile: null, // To store the selected image file in Redux
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return {
        ...state,
        imageFile: action.payload, // Save the file to Redux
      };
    default:
      return state;
  }
};

export default imageReducer;