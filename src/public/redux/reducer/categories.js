const initialState = {
    data: [],
    isLoading: false
}

// create a reducer for getting network from RESTful API
export default categories = (state = initialState, action) => {
    switch(action.type){
        case 'GET_CATEGORY_PENDING': // in case when loading get data
            return {
                isLoading: true
            }
        case 'GET_CATEGORY_REJECTED': // in case error network/else
            return {
                isLoading: false,
                isError: true,
            }
        case 'GET_CATEGORY_FULFILLED': // in case successfuly get data
            return {
                isLoading: false,
                isError: false,
                data: action.payload.data.values
            }

        case 'ADD_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true
            };
        case 'ADD_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false
            };
        case 'ADD_CATEGORIES_FULFILLED':
            console.log("ISI data last");
            console.log(action.payload.data.data[0]);
            
            

            return {
                ...state,
                isLoading: false,
                data: [...state.data,action.payload.data.data[0]]
            };


        default:
            return state;
    }

}