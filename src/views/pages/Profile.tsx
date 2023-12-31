import { type User } from "@prisma/client";
import InfoItem from "@views/components/Checkout/InfoItem";
import Dropdown from "@views/components/Dropdown";
import ChangePassword from "@views/features/Profile/ChangePassword";
import InformationTitle from "@views/features/Profile/Information";
import ManageAddress from "@views/features/Profile/ManageAddress";
import SettingTitle, { SettingItem } from "@views/features/Profile/Setting";
import { appActions, appState } from "@views/valtio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    appActions.logout();
    navigate("/login");
  };

  const { profile } = useSnapshot(appState);
  const { email, phone, name, avatar } = profile?.user as User;

  const InformationItems = [
    <InfoItem
      key="1"
      isDisabled={!isEditMode}
      title="Name"
      value={name}
    />,
    <InfoItem
      key="2"
      isDisabled={!isEditMode}
      title="Phone number"
      value={phone}
    />,
    <InfoItem
      key="3"
      isDisabled={!isEditMode}
      title="Email"
      value={email}
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

  return (
    <div className="flex-col justify-center items-center w-full gap-4">
      <div className="flex-col justify-center items-center gap-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />

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
