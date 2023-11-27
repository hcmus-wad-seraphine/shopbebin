import Container from "@components/Container";
import ProductsDisplay from "@components/ProductsDisplay";
// import UtilsBar from "@views/layouts/UtilsBar";

const UserRoot = () => {
  return (
    <Container>
      {/* <UtilsBar /> */}
      <ProductsDisplay />
    </Container>
  );
};

export default UserRoot;
