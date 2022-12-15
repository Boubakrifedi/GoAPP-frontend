import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_PICTURE } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setImageProfile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  
const uploadError = document.querySelector(".upload.error");
const uploadSuccess = document.querySelector(".upload.success");
  const uploadPicture = (image, id) => {
    let data = {
      picture: image,
      id
    }
    console.log(data,'data')
    
      return (dispatch) => {
        return axios
          .put(`${process.env.REACT_APP_API_URL}api/user/image`, data)
          .then((res) => {
            if (res.data.errors) {
              uploadError.innerHTML = res.data.errors.format;
              uploadSuccess.innerHTML = "";
            } else {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
              uploadError.innerHTML = "";
              uploadSuccess.innerHTML = "Modification bien enregistrée";
            }
          })
          .catch((err) => console.log(err));
      }}
  const handleChangeImage = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    let img;
    if (!files.length) return;
    reader.onload = (e) => {
      img = e.target.result;
      setImageProfile(img);
    };
    reader.readAsDataURL(files[0]);
  };

  const handlePicture = (e) => {
    e.preventDefault()
    dispatch(uploadPicture(file, userData._id))
  }

  return (
    <>
      <div>
        <h3>Photo de profil</h3>
        <img src={file ? file : userData.picture} alt="user-pic" />
      </div>

      <form action="" onSubmit={(e) => handlePicture(e)} className="upload-pic">
        <label htmlFor="file">Changer d'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => { handleChangeImage(e) }}
        />
        <br />
        <input type="submit" value="Envoyer" />

        <div className="upload error"></div>
        <div className="upload success"></div>
      </form>
    </>
  );
};

export default UploadImg;
