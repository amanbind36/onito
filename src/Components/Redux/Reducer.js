
const initialState = {
    formData: [],
  };
  
  const form2Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUBMIT_FORM2_DATA':
        return {
          ...state,
          formData: [...state.formData, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default form2Reducer;
  