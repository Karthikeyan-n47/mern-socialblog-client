import "./settings.css";
import SideBar from "../../components/sidebar/SideBar";
import { useState } from "react";
// import { context } from "../../context/Context";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

export default function Settings() {
  // const { user, dispatch } = useContext(context);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [updateSuccessfull, setUpdateSuccessfull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("about", about);
    if (password) {
      data.append("password", password);
    }
    // data.append("userId", user._id);
    data.append("profilePic", user.profilePic);
    if (file) {
      data.append("file", file);
    }
    // dispatch({ type: "UPDATE_START" });
    dispatch(updateUserStart());
    try {
      // console.log(data);
      const res = await axios.put(`/users/${user._id}`, data);
      // console.log(res);
      // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      dispatch(updateUserSuccess(res?.data));
      setUpdateSuccessfull(true);
      setError("");
    } catch (err) {
      // console.log(err);
      // dispatch({ type: "UPDATE_FAILURE" });
      dispatch(updateUserFailure(err.message));
      if (err.response) {
        setError(err?.response?.data);
      } else {
        setError("Something went wrong! Please try again!");
      }
      setUpdateSuccessfull(false);
    }
  };
  const handleDelete = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await axios.delete(`/users/${user?._id}`);
      console.log(res?.data);
      // dispatch({ type: "LOGOUT" });
      dispatch(deleteUserSuccess);
      setError("");
    } catch (err) {
      // console.log(err.message);
      dispatch(deleteUserFailure(err.message));
      if (err.response) {
        setError(err?.response?.data);
      } else {
        setError("Something went wrong! Please try again!");
      }
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>
            Delete Your Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              className="settingsPPImg"
              src={
                (file ? URL.createObjectURL(file) : user?.profilePic) ||
                "https://socialmedia-mern-stack-s3-upload.s3.ap-south-1.amazonaws.com/uploads/1713266275730-noAvatar.png"
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="**************"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>About Me</label>
          <textarea
            type="text"
            placeholder={user.about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {updateSuccessfull && (
            <span className="updateSuccess">
              Your profile has been successfully updated...
            </span>
          )}
          {error && <span className="updateError">Uh oh! {error}</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
