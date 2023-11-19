import type { FC } from "react";
import Header from "../layouts/Header";
import Container from "../components/Container";

interface Props {}

const LogIn = () => {
  return (
    <Container isAdmin={false}>
      <div className="flex-col px-[400px] py-[100px] gap-4">
        <h2 className="font-semibold text-xl">Log In</h2>

        <div className="flex-col">
          <p>Username or email adress</p>
          <input type="text" className="flex-1 border-black border-[1px]" />
        </div>

        <div className="flex-col">
          <p>Password</p>
          <input type="text" className="flex-1 border-black border-[1px]" />
        </div>

        <div className="justify-between">
          <div className="justify-center items-center gap-2">
            <div className="w-4 h-4 rounded-sm border-[1px] border-black"></div>
            Remember me
          </div>
          <a>Forget password</a>
        </div>

        <a
          href="/"
          className="bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
        >
          Log In
        </a>
      </div>
    </Container>
  );
};

export default LogIn;
