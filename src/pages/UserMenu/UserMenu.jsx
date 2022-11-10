import "./UserMenu.css";
import "../AuthNav/AuthNav.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, updateAvatar } from "../../Redux/actions";
import Avatar from "@mui/material/Avatar";
import Modal from "../../components/Modal/Modal";

const UserMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onAvatarChange = (e) => {
    e.preventDefault();
    const { avatar } = e.currentTarget.elements;
    const formData = new FormData();
    formData.append("avatar", avatar.files[0]);
    dispatch(updateAvatar(formData));
    toggleModal();
  };

  return (
    <>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <button type="button" onClick={toggleModal} className="close-btn">
            Close
          </button>
          <form onSubmit={onAvatarChange}>
            <input
              type="file"
              name="avatar"
              formEncType="multipart/form-data"
            />
            <button type="submit" className="button">
              Send
            </button>
          </form>
        </Modal>
      )}

      <h1 className="header-title">
        Welcome <span className="header-name">{user.name}</span>!
      </h1>
      <Avatar
        alt={user.name}
        src={
          !user.avatarURL.includes("gravatar")
            ? `https://phone-boo.herokuapp.com/${user.avatarURL}`
            : user.avatarURL
        }
        sx={{ width: 50, height: 50, cursor: "pointer" }}
        onClick={() => toggleModal()}
      />

      <button
        className="header-button logout-btn"
        type="button"
        onClick={() => {
          dispatch(logOut());
        }}
      >
        log out
      </button>
    </>
  );
};
export default UserMenu;
