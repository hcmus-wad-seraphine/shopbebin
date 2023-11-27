import { appState } from "@views/valtio";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appState.profile?.jwt}`,
        },
      });
      const data = await response.json();
      console.log("--> profile", data);
    };

    fetchProfile().catch(() => {
      navigate("/login");
    });
  }, []);

  return <div>Profile</div>;
};

export default Profile;
