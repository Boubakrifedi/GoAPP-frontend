import {
  DELETE_USER,
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPDATE_EMAIL,
  UPDATE_PSEUDO,
  UPLOAD_PICTURE,
  REMOVEFOLLOWER_USER
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case DELETE_USER:
      return action.payload;

    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case UPDATE_PSEUDO:
      return {
        ...state,
        pseudo: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
      case REMOVEFOLLOWER_USER:
      return {
        ...state,
        followers: state.followers.filter(
          (id) => id !== action.payload.idToRemove
        ),
      };
    default:
      return state;
  }
}
