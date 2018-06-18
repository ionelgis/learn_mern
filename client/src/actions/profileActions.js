import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";

//get curent profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};
//create profile

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add experience action
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete account and profile action
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//profile laogding
export const setProfileLoading = () => {
  return { type: PROFILE_LOADING };
};

//clear profile
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};

//
