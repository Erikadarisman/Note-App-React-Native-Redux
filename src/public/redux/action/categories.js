// import axios for getting data from API
import axios from "axios";

const url = "http://192.168.100.55:4000";

export const getCategory = () => {
  return {
    type: "GET_CATEGORY",
    payload: axios.get(url + "/categories")
  };
};

// export action that get notes
export const postCategories = dataCategories => {
  if (dataCategories.name !== "" && dataCategories.image !== "") {
    return {
      type: "ADD_CATEGORIES",
      payload: axios.post(url + "/categories", dataCategories)
    };
  }
};
// export const editCategories = dataCategories => {
//   if (
//     dataNotes.id !== "" &&
//     dataNotes.title !== "" &&
//     dataNotes.text !== "" &&
//     dataNotes.idCategory !== ""
//   ) {
//     return {
//       type: "EDIT_NOTES",
//       payload: axios.patch(URL + "/notes/" + dataNotes.id, dataNotes)
//     };
//   }
// };
export const deleteCategories = id => {  
  return {
    type: "DELETE_CATEGORIES",
    payload: axios.delete(url + `/categories/` + id)
  };
};
