import Button from "./Button";

const UtilsBar = () => {
  return (
    <div className="items-center justify-between py-3">
      <Button href="/notifications" style="max-w-[200px]">
        <i className="fas fa-solid fa-bell"></i>
        <p>Notifications</p>
      </Button>

      <div className="gap-6">
        <a>Basket</a>
        <a>Hat</a>
        <a>Gaming mouse</a>
        <a>Cosmetics</a>
        <a>Toy</a>
        <a>Books</a>
        <a>Rack</a>
        <a>Backpack</a>
        <a>Tumblr</a>
        <a>Umbrella</a>
      </div>

      <Button href="/cart" style="max-w-[200px]">
        <i className="fas fa-solid fa-shopping-cart"></i>
        <p>My cart</p>
      </Button>
    </div>
  );
};

export default UtilsBar;
