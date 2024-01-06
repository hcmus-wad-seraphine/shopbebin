import { type User } from "@prisma/client";
import InfoItem from "@views/components/Checkout/InfoItem";
import Dropdown from "@views/components/Dropdown";
import ChangePassword from "@views/features/Profile/ChangePassword";
import InformationTitle from "@views/features/Profile/Information";
import ManageAddress from "@views/features/Profile/ManageAddress";
import SettingTitle, { SettingItem } from "@views/features/Profile/Setting";
import { appActions, appState } from "@views/valtio";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const Profile = () => {
  const { profile } = useSnapshot(appState);
  const { email, phone, name, avatar } = profile?.user as User;

  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangingPhoto, setIsChangingPhoto] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar);
  const [newName, setNewName] = useState<string>(name);
  const [newPhone, setNewPhone] = useState<string>(phone);
  const [newEmail, setNewEmail] = useState<string>(email);

  const navigate = useNavigate();

  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

  const handleLogout = () => {
    appActions.logout();
    navigate("/login");
  };

  const updateProfile = async () => {
    if (!appState.profile) return;

    const newUserData: User = {
      ...appState.profile.user,
      addresses: appState.profile.user.addresses.map((address) => address),
      cart: appState.profile.user.cart.map((item) => ({
        ...item,
        toppingNames: item.toppingNames.map((name) => name),
      })),
      name: newName,
      phone: newPhone,
      email: newEmail,
      avatar: newAvatar,
    };

    appActions.updateProfile(newUserData);

    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appState.profile.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    const user = await res.json();
    console.log(user);
  };

  const handleUpdateProfile = () => {
    updateProfile().catch((err) => {
      console.log(err);
    });
  };

  const handleChangeAvatar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    fetch("/api/storage/upload-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appState.profile?.token}`,
      },
      body: formData,
    })
      .then(async (res) => {
        const { url } = await res.json();
        setNewAvatar(url);
      })
      .catch((err) => {
        console.log("--> err", err);
      })
      .finally(() => {
        setIsChangingPhoto(false);
      });
  };

  const InformationItems = [
    <InfoItem
      key="1"
      isDisabled={!isEditMode}
      title="Name"
      value={newName}
      onChange={setNewName}
    />,
    <InfoItem
      key="2"
      isDisabled={!isEditMode}
      title="Phone number"
      value={phone}
      onChange={setNewPhone}
    />,
    <InfoItem
      key="3"
      isDisabled={!isEditMode}
      title="Email"
      value={email}
      onChange={setNewEmail}
    />,
  ];

  const SettingItems = [
    <SettingItem
      key="1"
      title="Change password"
      icon="key"
      component={<ChangePassword />}
    />,
    <SettingItem
      key="2"
      title="Manage address"
      icon="home"
      component={<ManageAddress />}
    />,
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "80%",
      maxWidth: "400px",
      maxHeight: "400px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="flex-col justify-center items-center w-full gap-4">
      <button onClick={handleUpdateProfile}>Save your changes</button>
      <Modal
        isOpen={isChangingPhoto}
        style={customStyles}
      >
        <div className="flex-col justify-center items-center gap-5 w-full">
          <div className="items-center justify-between w-full">
            <h1 className="text-primary text-xl font-semibold">Change avatar</h1>
            <button
              onClick={() => {
                setIsChangingPhoto(false);
              }}
            >
              <i className="fa-solid fa-xmark text-xl text-primary"></i>
            </button>
          </div>

          <form
            encType="multipart/form-data"
            className="flex flex-col justify-center items-center gap-5 w-full"
            onSubmit={handleChangeAvatar}
          >
            <FileUploader
              multiple={false}
              handleChange={setAvatarFile}
              name="avatar"
              types={fileTypes}
            />

            {avatarFile && (
              <img
                className="w-[200px] h-[200px] rounded-full object-cover"
                src={URL.createObjectURL(avatarFile)}
                alt=""
              />
            )}

            <button
              className="rounded-full bg-primary px-5 py-2 text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>

      <div className="flex-col justify-center items-center gap-4">
        <div className="flex-col justify-center items-center gap-4">
          <img
            src={newAvatar}
            alt="avatar"
            className="w-[200px] h-[200px] rounded-full object-cover"
          />

          <button
            onClick={() => {
              setIsChangingPhoto(true);
            }}
            className="text-primary font-semibold"
          >
            Change profile photo
          </button>
        </div>

        <p className="text-xl font-semibold">{name}</p>
      </div>

      <Dropdown
        style="w-full"
        title={
          <InformationTitle
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        }
        items={InformationItems}
      />

      <Dropdown
        style="w-full"
        title={<SettingTitle />}
        items={SettingItems}
      />

      <button
        className="w-full max-w-[800px] flex items-center justify-between px-5 py-3 bg-primary rounded-full"
        onClick={handleLogout}
      >
        <div className="items-center text-white text-lg font-semibold gap-2">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          Log out
        </div>

        <i className="fa-solid fa-chevron-right text-white"></i>
      </button>
    </div>
  );
};

export default Profile;
