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
    const name = data["register--name"];
    const unitNumber = data["register--unit-number"];
    const street = data["register--street"];
    const district = data["register--district"];
    const city = data["register--city"];

    const register = async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ phone, email, name, password, unitNumber, street, district, city }),
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
        label="Name"
        name="register--name"
        type="text"
        className="col-span-2"
      />

      <FormInput
        label="Phone number"
        name="register--phone"
        className="col-span-1"
      />

      <FormInput
        label="Email"
        name="register--email"
        type="email"
        className="col-span-1"
      />

      <FormInput
        label="Password"
        name="register--password"
        type="password"
        className="col-span-1"
      />

      <FormInput
        label="Confirm password"
        name="register--confirm-password"
        type="password"
        className="col-span-1"
      />

      <FormInput
        label="Unit number"
        name="register--unit-number"
        type="text"
        className="col-span-1"
      />

      <FormInput
        label="Street"
        name="register--street"
        type="text"
        className="col-span-1"
      />

      <FormInput
        label="District"
        name="register--district"
        type="text"
        className="col-span-1"
      />

      <FormInput
        label="City"
        name="register--city"
        type="text"
        className="col-span-1"
      />

      {res !== undefined && (
        <CallOut
          type={res.ok ? "success" : "error"}
          title={res.statusText}
          description={res.ok ? "You can now login" : "Please try again"}
          className="col-span-2"
        />
      )}

      <button
        className="col-span-2 mx-auto w-fit bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
        type="submit"
      >
        Register
      </button>
    </FormContainer>
  );
};

export default Register;
