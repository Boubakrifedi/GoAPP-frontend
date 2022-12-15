import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, removefollowUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToRemove,idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };
  const handleRemovefollow = () => {
    dispatch(removefollowUser(userData._id, idToRemove));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
          {type === "remove" && <button className="unfollow-btn">Remove</button>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span >
          {type === "suggestion" && <button onClick={handleFollow} className="follow-btn">Suivre</button>}
          {type === "remove" && <button onClick={handleRemovefollow} className="unfollow-btn" style={{margin:"10px 0"}} >Remove</button>}
          {type === "card" && <img onClick={handleFollow} src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
