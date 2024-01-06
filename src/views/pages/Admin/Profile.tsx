import { type User } from "@prisma/client";
import InfoItem from "@views/components/Checkout/InfoItem";
import Dropdown from "@views/components/Dropdown";
import ChangePassword from "@views/features/Profile/ChangePassword";
import InformationTitle from "@views/features/Profile/Information";
import SettingTitle, { SettingItem } from "@views/features/Profile/Setting";
import { appActions, appState } from "@views/valtio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const AdminProfile = () => {
  const { profile } = useSnapshot(appState);
  const { email, phone, name } = profile?.user as User;

  const [isEditMode, setIsEditMode] = useState(false);
  const [newName, setNewName] = useState<string>(name);
  const [newPhone, setNewPhone] = useState<string>(phone);
  const [newEmail, setNewEmail] = useState<string>(email);

  const navigate = useNavigate();

  const handleLogout = () => {
    appActions.logout();
    navigate("/admin/login");
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
  ];

  return (
    <div className="flex-col justify-center items-center w-full gap-4">
      <button onClick={handleUpdateProfile}>Save your changes</button>

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

export default AdminProfile;
