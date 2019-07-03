// import axios for getting data from API
import axios from 'axios';

const URL = 'http://192.168.100.55:4000'
// export action that get notes
export const getNotes = () => {
    return {
        type: 'GET_NOTES',
        payload: axios.get(URL+'/notes')
    }
}

export const getCategories = () =>{
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get(URL+'/categories')
    }
}

// export const updateNote = (id) => {
//     return {
//         type: 'GET_NOTES',
//         payload: axios.get('https://randomuser.me/api/id)
//     }
// }

// export const getCategory = () => {
//     return {
//         type: 'GET_NOTES',
//         payload: axios.get('https://randomuser.me/api?results=10')
//     }
// }