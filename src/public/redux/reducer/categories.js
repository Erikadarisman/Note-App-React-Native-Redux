const initialState = {
  data: [],
  isLoading: false
};

// create a reducer for getting network from RESTful API
export default (categories = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_PENDING": // in case when loading get data
      return {
        isLoading: true
      };
    case "GET_CATEGORY_REJECTED": // in case error network/else
      return {
        isLoading: false,
        isError: true
      };
    case "GET_CATEGORY_FULFILLED": // in case successfuly get data
      return {
        isLoading: false,
        isError: false,
        data: action.payload.data.values
      };

    case "ADD_CATEGORIES_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "ADD_CATEGORIES_REJECTED":
      return {
        ...state,
        isLoading: false
      };
    case "ADD_CATEGORIES_FULFILLED":
      console.log("ISI data last");
      console.log(action.payload.data.data[0]);
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload.data.data[0]]
      };

    // //edit notes
    // case "EDIT_NOTES_PENDING":
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case "EDIT_NOTES_REJECTED":
    //   return {
    //     ...state,
    //     isLoading: false
    //   };
    // case "EDIT_NOTES_FULFILLED":
    //   // console.log("ISI data last");
    //   // console.log(action.payload.data.data[0]);
    //   // console.log('action.payload.data.data');
    //   // console.log(action.payload.data.data[0].id);
    //   // console.log(action.payload.data.data[0]);
    //   // let isi = state.data.map( notes =>(
    //   //   notes.id == action.payload.data.data[0].id ? action.payload.data.data[0] : notes
    //   // ))
    //   // console.log('isi');
    //   // console.log(isi);

    //   console.log("state.data");
    //   console.log(state.data);

    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: false,
    //     data: state.data.map(notes =>
    //       notes.id == action.payload.data.data[0].id
    //         ? action.payload.data.data[0]
    //         : notes
    //     )
    //   };

    case "DELETE_CATEGORIES_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "DELETE_CATEGORIES_REJECTED":
      return {
        ...state,
        isLoading: false
      };
    case "DELETE_CATEGORIES_FULFILLED":      
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: state.data.filter(
          categories => categories.id != action.payload.data.data.id
        )
      };

    default:
      return state;
  }
});
