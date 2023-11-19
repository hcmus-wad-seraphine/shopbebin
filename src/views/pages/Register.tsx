import Container from "../components/Container";

const Register = () => {
  return (
    <Container isAdmin={false}>
      <div className="flex-col px-[400px] py-[100px] gap-4">
        <h2 className="font-semibold text-xl">Create your account</h2>
        <div className="flex-col">
          <p>Username</p>
          <input type="text" className="flex-1 border-black border-[1px]" />
        </div>
        <div className="flex-col">
          <p>Email adress</p>
          <input type="text" className="flex-1 border-black border-[1px]" />
        </div>
        <div className="flex-col">
          <p>Password</p>
          <input type="text" className="flex-1 border-black border-[1px]" />
        </div>
        <div className="flex-col">
          <p>Confirm your password</p>
          <input type="text" className="flex-1 border-black border-[1px]" />
        </div>
        <a
          href="/"
          className="bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
        >
          Register
        </a>
      </div>
    </Container>
  );
};

export default Register;
