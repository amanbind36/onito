


const initialState = {
    formData: [],
  };
  
  const form1Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUBMIT_FORM1_DATA':
        return {
          ...state,
          formData: [...state.formData, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default form1Reducer;
  