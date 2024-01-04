const ProductTitleRow = () => {
  return (
    <div className="grid grid-cols-12 gap-4 font-semibold">
      <div className="col-span-1">ID</div>
      <div className="col-span-1">Thumbnail</div>
      <div className="col-span-2">Named</div>
      <div className="col-span-1">Base price</div>
      <div className="col-span-1">Category</div>
      <div className="col-span-1">Sizes</div>
      <div className="col-span-2">Toppings</div>
    </div>
  );
};

export default ProductTitleRow;
