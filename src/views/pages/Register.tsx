import Container from "@components/Container";
import { FormContainer, FormInput } from "@views/components/Form";
import { type FormEvent, useState } from "react";
import { type ErrorResponse, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const password = data["register--password"];
    const confirmPassword = data["register--confirm-password"];
    if (password !== confirmPassword) {
      setError("Password and confirm password must match");
      return;
    }

    const phone = data["register--phone"];
    const email = data["register--email"];

    const register = async () => {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ phone, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorResponse: ErrorResponse = await response.json();
        setError(errorResponse.statusText);
      }
    };

    register().catch(() => {
      setError("Server error");
    });
  };

  return (
    <Container>
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

        {error !== undefined && <p className="text-red-500">{error}</p>}

        <button
          className="bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
          type="submit"
        >
          Register
        </button>
      </FormContainer>
    </Container>
  );
};

export default Register;
