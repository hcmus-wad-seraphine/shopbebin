import Container from "@components/Container";
import { FormContainer, FormInput } from "@views/components/Form";
import { type FormEvent } from "react";

const Register = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
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
