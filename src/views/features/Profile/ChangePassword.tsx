import { type User } from "@prisma/client";
import { appActions, appState } from "@views/valtio";
import { useState } from "react";
import { useSnapshot } from "valtio";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noti, setNoti] = useState("");

  const { profile } = useSnapshot(appState);
  const { id } = profile?.user as User;

  const handleCheckError = () => {
    if (currentPassword === "") {
      setNoti("Current password is required");
      return false;
    }
    if (newPassword === "") {
      setNoti("New password is required");
      return false;
    }
    if (confirmPassword === "") {
      setNoti("Confirm password is required");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setNoti("Confirm password does not match");
      return false;
    }
    if (currentPassword === newPassword) {
      setNoti("New password must be different from current password");
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    const response = await fetch("/api/profile/change-password", {
      method: "POST",
      body: JSON.stringify({ id, password: currentPassword, newPassword }),
      headers: {
        Authorization: `Bearer ${profile?.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      setNoti("Change password successfully!");
      const user = await response.json();
      appActions.updateProfile(user);
      return true;
    } else {
      setNoti(response.statusText);
      return false;
    }
  };

  const handleConfirm = () => {
    if (!handleCheckError()) return;

    handleChangePassword().catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="flex-col">
      <h1>Current password</h1>
      <input
        className="border-2 border-primary rounded-xl"
        title="Current password"
        type="password"
        onChange={(text) => {
          setCurrentPassword(text.target.value);
        }}
      />

      <h1>New password</h1>
      <input
        className="border-2 border-primary rounded-xl"
        title="New password"
        type="password"
        onChange={(text) => {
          setNewPassword(text.target.value);
        }}
      />

      <h1>Confirm new password</h1>
      <input
        className="border-2 border-primary rounded-xl"
        title="Confirm new password"
        type="password"
        onChange={(text) => {
          setConfirmPassword(text.target.value);
        }}
      />

      <p>{noti}</p>

      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default ChangePassword;
