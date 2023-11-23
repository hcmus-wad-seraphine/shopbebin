import Container from "@components/Container";
import { FormContainer, FormInput } from "@views/components/Form";
import { type FormEvent } from "react";

const Register = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const password = data["register--password"];
    const confirmPassword = data["register--confirm-password"];
    if (password !== confirmPassword) {
      alert("Password and confirm password must match");
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
      const data = await response.json();
      console.log(data);
    };

    register().catch((err) => {
      console.error("[ERROR: register]", err);
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
