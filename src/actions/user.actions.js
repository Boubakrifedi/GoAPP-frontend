import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const DELETE_USER = "DELETE_USER";
export const REMOVEFOLLOWER_USER = "REMOVEFOLLOWER_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (userId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const removeUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};
export const removefollowUser = (followerId, idToRemove) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/remove/` + followerId,
      data: { idToRemove },
    })
      .then((res) => {
        dispatch({ type: REMOVEFOLLOWER_USER, payload: { idToRemove } });
      })
      .catch((err) => console.log(err));
  };
};
