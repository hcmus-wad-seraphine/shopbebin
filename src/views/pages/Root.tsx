import Container from "@components/Container";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default RootPage;
