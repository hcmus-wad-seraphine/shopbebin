import InfoItem from "@views/components/Checkout/InfoItem";
import Dropdown from "@views/components/Dropdown";
import InformationTitle from "@views/features/Profile/Information";
import SettingTitle, { SettingItem } from "@views/features/Profile/Setting";
import { appActions, appState } from "@views/valtio";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appState.profile?.jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
    };

    fetchProfile().catch(() => {
      navigate("/login");
    });
  }, []);

  const handleLogout = () => {
    appActions.logout();
    navigate("/login");
  };

  const InformationItems = [
    <InfoItem
      key="1"
      isDisabled={!isEditMode}
      title="Name"
      value="John Doe"
    />,
    <InfoItem
      key="2"
      isDisabled={!isEditMode}
      title="Phone number"
      value="0779944549"
    />,
    <InfoItem
      key="3"
      isDisabled={!isEditMode}
      title="Email"
      value="bindum@gmail.com"
    />,
  ];

  const SettingItems = [
    <SettingItem
      key="1"
      title="Change password"
      icon="key"
    />,
    <SettingItem
      key="1"
      title="Change password"
      icon="key"
    />,
  ];

  return (
    <div className="flex-col justify-center items-center w-full">
      <div className="flex-col">
        <img
          src=""
          alt=""
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <p>Username</p>
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
        className="w-full max-w-[600px] flex items-center justify-between px-5 py-3 bg-primary rounded-full"
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
