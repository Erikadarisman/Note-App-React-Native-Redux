// import axios for getting data from API
import axios from "axios";

const URL = "http://192.168.100.55:4000";
// export action that get notes
export const getNotes = () => {
  return {
    type: "GET_NOTES",
    payload: axios.get(URL + "/notes")
  };
};

export const postNotes = dataNotes => {
  if (
    dataNotes.title !== "" &&
    dataNotes.text !== "" &&
    dataNotes.idCategory !== ""
  ) {
    return {
      type: "ADD_NOTES",
      payload: axios.post(URL + "/notes", dataNotes)
    };
  }
};
export const editNotes = dataNotes => {
  if (
    dataNotes.id !== "" &&
    dataNotes.title !== "" &&
    dataNotes.text !== "" &&
    dataNotes.idCategory !== ""
  ) {
    return {
      type: "EDIT_NOTES",
      payload: axios.patch(URL + "/notes/" + dataNotes.id, dataNotes)
    };
  }
};
export const deleteNotes = (id) => {
  return {
    type: "DELETE_NOTES",
    payload: axios.delete(URL+`/notes/`+id)
  };
};

export const searchNotes = (keyword) => {
  return {
    type: "SEARCH_NOTES",
    payload: axios.get(URL+`/notes?search=`+keyword)
  };
};

export const sortNotes = (sort) => {
  return {
    type: "SORT_NOTES",
    payload: axios.get(URL+`/notes?sort=`+sort)
  };
};


