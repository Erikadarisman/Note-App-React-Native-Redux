const initialState = {
  number: 10,
  data: [],
  values: [],
  isLoading: false,
  isError: false
};

// create a reducer for getting network from RESTful API
export default (notes = (state = initialState, action) => {
  switch (action.type) {
    //get notes
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

    //add notes
    case "ADD_NOTES_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "ADD_NOTES_REJECTED":
      return {
        ...state,
        isLoading: false
      };
    case "ADD_NOTES_FULFILLED":
      console.log("ISI data last");
      console.log(action.payload.data.data[0]);
      return {
        ...state,
        isLoading: false,
        data: [action.payload.data.data[0], ...state.data]
      };

    //edit notes
    case "EDIT_NOTES_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "EDIT_NOTES_REJECTED":
      return {
        ...state,
        isLoading: false
      };
    case "EDIT_NOTES_FULFILLED":
      // console.log("ISI data last");
      // console.log(action.payload.data.data[0]);
      // console.log('action.payload.data.data');
      // console.log(action.payload.data.data[0].id);
      // console.log(action.payload.data.data[0]);
      // let isi = state.data.map( notes =>(
      //   notes.id == action.payload.data.data[0].id ? action.payload.data.data[0] : notes
      // ))
      // console.log('isi');
      // console.log(isi);

      return {
        ...state,
        isLoading: false,
        data: state.data.map( notes =>(
          notes.id == action.payload.data.data[0].id ? action.payload.data.data[0] : notes
        ))

      };

    //GET CATEGORIES

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
});
