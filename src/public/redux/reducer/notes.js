const initialState = {
  number: 10,
  data: [],
  values: [],
  isLoading: false,
  isError: false
};

// create a reducer for getting network from RESTful API
export default notes = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTES_PENDING": // in case when loading get data
      return {
        isLoading: true
      };
    case "GET_NOTES_REJECTED": // in case error network/else
      return {
        isLoading: false,
        isError: true
      };
    case "GET_NOTES_FULFILLED": // in case successfuly get data
      return {
        isLoading: false,
        isError: false,
        data: action.payload.data.values
      };

    //GET CATEGORIES
    case "GET_CATEGORIES_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_CATEGORIES_REJECTED":
      return {
        ...state,
        isLoading: false
      };
    case "GET_CATEGORIES_FULFILLED":
      console.log("Isi state");
      console.log(state);
      console.log("Isi Payload Action");
      console.log(action);
      return {
        ...state,
        isLoading: false,
        categories: action.payload.data.values
      };

    // example when updating/deleting and not getting all notes again
    // case 'UPDATE_NOTE_FULFILLED':
    //     return {
    //         isLoading: false,
    //         isError: false,
    //         data: {
    //             ...state, // get all previous state

    // deleting from array
    // data: state.data.filter(note => {
    // note.login.username !== action.payload.data // when deleting
    // })

    // updating array
    // data: state.data.map((item, index) => {
    //     if(item.login.username === action.payload.data.login.username ){
    //         item = action.paypload.data // change note to newest one
    //     }
    //     return item;
    // })
    //     }
    // }

    default:
      return state;
  }
};
