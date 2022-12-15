import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { NavLink } from "react-router-dom";
import { ADD_POST, getPosts } from "../../actions/post.actions";
import moment from "moment";
import axios from "axios";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const userData = useSelector((state) => state.userReducer);
  // const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();
  const uploadError = document.querySelector(".upload.error");
  const uploadSuccess = document.querySelector(".upload.success");

  const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
          if (res.data.errors) {
            uploadError.innerHTML = res.data.errors.format;
            uploadSuccess.innerHTML = "";
          } else {
            uploadError.innerHTML = "";
            uploadSuccess.innerHTML = "poste bien publié";
            dispatch({ type: ADD_POST, payload: res.data });
          }
        })
        .catch((err) => console.log(err, "test"));
    };
  };
  const handlePost = async () => {
    if (message || postPicture || video) {
      let data = {
        posterId: userData._id,
        message: message,
        picture: postPicture,
        video: video,
      };
      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    let img;
    if (!files.length) return;
    reader.onload = (e) => {
      img = e.target.result;
      setPostPicture(img);
    };
    reader.readAsDataURL(files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>
                      {moment(Date.now()).format("MMMM Do YYYY, h:mm a")}
                    </span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              <div className="upload error"></div>
              <div className="upload success"></div>
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
