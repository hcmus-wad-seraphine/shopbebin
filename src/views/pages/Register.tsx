import CallOut from "@views/components/CallOut";
import { FormContainer, FormInput } from "@views/components/Form";
import { type FormEvent, useState } from "react";
import { type ErrorResponse } from "react-router-dom";

const Register = () => {
  const [res, setRes] = useState<{
    ok: boolean;
    statusText: string;
  }>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const password = data["register--password"];
    const confirmPassword = data["register--confirm-password"];
    if (password !== confirmPassword) {
      setRes({
        ok: false,
        statusText: "Passwords do not match",
      });
      return;
    }

    const phone = data["register--phone"];
    const email = data["register--email"];

    const register = async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ phone, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setRes({
          ok: true,
          statusText: "Account created successfully",
        });
      } else {
        const errorResponse: ErrorResponse = await response.json();
        setRes({
          ok: false,
          statusText: errorResponse.statusText,
        });
      }
    };

    register().catch(() => {
      setRes({
        ok: false,
        statusText: "Something went wrong",
      });
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2 className="font-semibold text-xl">Create your account</h2>

      <FormInput
        label="Phone number"
        name="register--phone"
      />

      <FormInput
        label="Email"
        name="register--email"
        type="email"
      />

      <FormInput
        label="Password"
        name="register--password"
        type="password"
      />

      <FormInput
        label="Confirm password"
        name="register--confirm-password"
        type="password"
      />

      {res !== undefined && (
        <CallOut
          type={res.ok ? "success" : "error"}
          title={res.statusText}
          description={res.ok ? "You can now login" : "Please try again"}
        />
      )}

      <button
        className="bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
        type="submit"
      >
        Register
      </button>
    </FormContainer>
  );
};

export default Register;
