import { combineReducers } from 'redux';

// import all reducers
import notes from './notes';
import categories from './categories';

// combine them
const appReducer = combineReducers({
    // auth,
    categories,
    notes // es6 shorthand from notes: notes
})

export default appReducer;