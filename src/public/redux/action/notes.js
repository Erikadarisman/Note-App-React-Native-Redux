// import axios for getting data from API
import axios from "axios";

const URL = "http://192.168.8.100:4000";
// export action that get notes
export const getNotes = () => {
  return {
    type: "GET_NOTES",
    payload: axios.get(URL + "/notes")
  };
};

export const categoryNotes = category => {
  return {
    type: "CATEGORY_NOTES",
    payload: axios.get(URL + "/notes?category=" + category)
  };
};

export const pageNotes = (page,search,sort) => {
  return {
    type: "PAGE_NOTES",
    payload: axios.get(
      URL + "/notes?page=" + page + "&search=" + search + "&sort=" + sort
    )
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

  return {
    type: "EDIT_NOTES",
    payload: axios.patch(URL + "/notes/" + dataNotes.id, {
      title:dataNotes.title,
      text:dataNotes.text,
      idCategory:`${dataNotes.idCategory}`
    })
  };
};
export const deleteNotes = id => {
  return {
    type: "DELETE_NOTES",
    payload: axios.delete(URL + `/notes/` + id)
  };
};

export const searchNotes = (search,sort) => {
  return {
    type: "SEARCH_NOTES",
    payload: axios.get(
      URL + "/notes?search=" + search + "&sort=" + sort
    )
  };
};

export const sortNotes = sort => {
  return {
    type: "SORT_NOTES",
    payload: axios.get(URL + `/notes?sort=` + sort)
  };
};
