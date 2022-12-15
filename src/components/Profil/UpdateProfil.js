import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import FollowHandler from "./FollowHandler";
import axios from "axios";
import {
  removeUser,
  UPDATE_BIO,
  UPDATE_EMAIL,
  UPDATE_PSEUDO,
} from "../../actions/user.actions";
import moment from "moment";
import ProfileStatus from "../ProfileStatus";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [updateBioo, setUpdateBio] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePseudo, setUpdatePseudo] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const emailError = document.querySelector(".email.error");
  const pseudoError = document.querySelector(".pseudo.error");
  const emailSuccess = document.querySelector(".email.success");
  const pseudoSuccess = document.querySelector(".pseudo.success");
  const bioSuccess = document.querySelector(".bio.success");
  const bioError = document.querySelector(".bio.error");

  let data = {
    _id: userData._id,
    email: email,
    bio: bio,
    pseudo: pseudo,
  };
  const update = (userId, data) => {
    return (dispatch) => {
      return axios
        .put(`${process.env.REACT_APP_API_URL}api/user/update/` + userId, data)
        .then((res) => {
          if (bio) {
            if (res.data.errors) {
              bioError.innerHTML = res.data.errors.bio;
              bioSuccess.innerHTML = "";
            } else {
              dispatch({ type: UPDATE_BIO, payload: bio });
              bioError.innerHTML = "";
              bioSuccess.innerHTML = "Modification bien enregistrée";
            }
          }

          if (pseudo) {
            if (res.data.errors) {
              pseudoError.innerHTML = res.data.errors.pseudo;
              pseudoSuccess.innerHTML = "";
            } else {
              dispatch({ type: UPDATE_PSEUDO, payload: pseudo });
              pseudoError.innerHTML = "";
              pseudoSuccess.innerHTML = "Modification bien enregistrée";
            }
          }
          if (email) {
            if (res.data.errors) {
              emailError.innerHTML = res.data.errors.email;
              emailSuccess.innerHTML = "";
            } else {
              dispatch({ type: UPDATE_EMAIL, payload: email });
              emailError.innerHTML = "";
              emailSuccess.innerHTML = "Modification bien enregistrée";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  // const updatepseudo = (userId, pseudo) => {
  //   return (dispatch) => {
  //     return axios({
  //       method: "put",
  //       url: `${process.env.REACT_APP_API_URL}api/user/update/` + userId,
  //       data: { pseudo },
  //     })
  //       .then((res) => {
  //         if (res.data.errors) {
  //           pseudoError.innerHTML = res.data.errors.pseudo;
  //           pseudoSuccess.innerHTML = "";
  //         } else {
  //           dispatch({ type: UPDATE_PSEUDO, payload: pseudo });
  //           pseudoError.innerHTML = "";
  //           pseudoSuccess.innerHTML = "Modification bien enregistrée";
  //         }
  //       })
  //       .catch((err) => { console.log(err) });
  //   };
  // };
  // const updateemail = (userId, email) => {
  //   return (dispatch) => {
  //     return axios({
  //       method: "put",
  //       url: `${process.env.REACT_APP_API_URL}api/user/update/` + userId,
  //       data: { email },
  //     })
  //       .then((res) => {
  //         if (res.data.errors) {
  //           emailError.innerHTML = res.data.errors.email;
  //           emailSuccess.innerHTML = "";
  //         } else {
  //           dispatch({ type: UPDATE_EMAIL, payload: email });
  //           emailError.innerHTML = "";
  //           emailSuccess.innerHTML = "Modification bien enregistrée";
  //         }

  //       })
  //       .catch((err) => { console.log(err) });
  //   };
  // };
 
  const handleUpdate = () => {
    dispatch(update(userData._id, data));
    setUpdateBio(false);
    setUpdatePseudo(false);
    setUpdateEmail(false);
  };

  const handleRemoveUser = () => dispatch(removeUser(userData._id));

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <UploadImg />
          <div className="pseudo-update">
            <h3>Pseudo</h3>
            {updatePseudo === false && (
              <>
                <p onClick={() => setUpdatePseudo(!updatePseudo)}>
                  {userData.pseudo}
                </p>
                <button onClick={() => setUpdatePseudo(!updatePseudo)}>
                  Modifier pseudo
                </button>
              </>
            )}
            {updatePseudo && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
            <div className="pseudo error"></div>
            <div className="pseudo success"></div>
          </div>
          <div className="pseudo-update">
            <h3>Email</h3>
            {updateEmail === false && (
              <>
                <p onClick={() => setUpdateEmail(!updateEmail)}>
                  {userData.email}
                </p>
                <button onClick={() => setUpdateEmail(!updateEmail)}>
                  Modifier email
                </button>
              </>
            )}
            {updateEmail && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.email}
                  onChange={(e) => setEmail(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
            <div className="email error"></div>
            <div className="email success"></div>
          </div>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateBioo === false && (
              <>
                <p onClick={() => setUpdateBio(!updateBioo)}>{userData.bio}</p>
                <button onClick={() => setUpdateBio(!updateBioo)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateBioo && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
            <div className="bio error"></div>
            <div className="bio success"></div>
          </div>
          <h4>
            Membre depuis le :{" "}
            {moment(userData.createdAt).format("MMMM Do YYYY, h:mm a")}
          </h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements : {userData.following ? userData.following.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
          <div
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer votre profil ?")) {
                handleRemoveUser();
                window.location = "/";
              }
            }}
          >
            <img src="./img/icons/trash.svg" alt="trash" />
          </div>
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
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"remove"}
                          />
                        </div>
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
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                          <FollowHandler
                            idToRemove={user._id}
                            type={"remove"}
                          />
                        </div>
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
      <h1> Status de {userData.pseudo}</h1>
      <ProfileStatus />
    </div>
  );
};

export default UpdateProfil;
