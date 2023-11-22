import NavigateButton from "./NavigateButton";

const UtilsBar = () => {
  return (
    <div className="items-center justify-between py-3">
      <NavigateButton
        style="max-w-[200px]"
        to="/"
      >
        <i className="fas fa-solid fa-bell"></i>
        <p>Notifications</p>
      </NavigateButton>

      <div className="gap-6">
        <a>Milk tea</a>
        <a>Fruit tea</a>
        <a>Smoothie</a>
        <a>Ice cream</a>
        <a>Snack</a>
      </div>

      <NavigateButton
        style="max-w-[200px]"
        to="/cart"
      >
        <i className="fas fa-solid fa-shopping-cart"></i>
        <p>My cart</p>
      </NavigateButton>
    </div>
  );
};

export default UtilsBar;
