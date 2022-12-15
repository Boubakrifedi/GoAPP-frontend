import React, { useEffect, useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { isEmpty } from "../Utils";
import Card from "../Post/Card";
import { getPosts } from "../../actions/post.actions";
import FollowHandler from "./FollowHandler";

const SearchedProfile = () => {
  let { userId } = useParams();
  const usersData = useSelector((state) => state.usersReducer);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const [userData, setuserData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
      .then((res) => {
        setuserData(res.data);
      })
      .catch((err) => console.log(err));
  });

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData?.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <div>
            <h3>Photo de profil</h3>
            <img src={userData?.picture} alt="user-pic" />
          </div>
          <div className="pseudo-update">
            <h3>Pseudo</h3>
            <p>{userData?.pseudo}</p>
          </div>
          <div className="pseudo-update">
            <h3>Email</h3>
            <p>{userData?.email}</p>
          </div>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            <p>{userData?.bio}</p>
          </div>
          <h4>
            Membre depuis le :{" "}
            {moment(userData?.createdAt).format("MMMM Do YYYY, h:mm a")}
          </h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements :{" "}
            {userData?.following ? userData?.following.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData?.followers ? userData?.followers.length : ""}
          </h5>
          <FollowHandler idToFollow={userData?._id} type={"suggestion"}/>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                if (userData.following.length === 0) {
                  setFollowingPopup(false);
                }
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                if (userData.followers.length === 0) {
                  setFollowersPopup(false);
                }
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      <h1> Status de {userData?.pseudo}</h1>
      <div>
        <ul className="status">
          {!isEmpty(posts[0]) &&
            // eslint-disable-next-line array-callback-return
            posts.map((post) => {
              if (post.posterId === userData?._id)
                return <Card post={post} key={post._id} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchedProfile;
