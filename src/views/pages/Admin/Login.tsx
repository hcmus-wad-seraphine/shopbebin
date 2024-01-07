import CallOut from "@views/components/CallOut";
import { FormContainer, FormInput } from "@views/components/Form";
import { appActions, type Profile } from "@views/valtio";
import { type FormEvent, useState } from "react";
import { type ErrorResponse, useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const identifier = data["login--email-phone"];
    const password = data["login--password"];

    const login = async () => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const { token, user } = await response.json();
        const profile: Profile = {
          token,
          user,
        };

        if (profile.user.role !== "ADMIN") {
          setErr("You are not an admin");
          return;
        }

        localStorage.setItem("token", token);
        appActions.login(profile);
        navigate("/admin");
      } else {
        const errorResponse: ErrorResponse = await response.json();
        setErr(errorResponse.statusText);
      }
    };

    login().catch(() => {
      console.log("Something went wrong");
    });
  };

  return (
    <div className="w-full place-content-center">
      <FormContainer onSubmit={handleSubmit}>
        <h2 className="font-semibold text-xl ">Login</h2>

        <FormInput
          label="Email or Phone number"
          name="login--email-phone"
          className="md:min-w-[600px] col-span-2 h-fit"
        />

        <FormInput
          label="Password"
          name="login--password"
          type="password"
          className="md:min-w-[600px] col-span-2 h-fit"
        />

        {err != null && (
          <CallOut
            type="error"
            title={err}
            className="col-span-2"
          />
        )}

        <button
          className="col-span-2 mx-auto w-fit bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
          type="submit"
        >
          Login
        </button>
      </FormContainer>
    </div>
  );
};

export default AdminLoginPage;
