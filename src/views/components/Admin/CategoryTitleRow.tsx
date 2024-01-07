const CategoryTitleRow = () => {
  return (
    <div className="grid grid-cols-8 gap-4 font-semibold">
      <div className="col-span-2 text-primary">ID</div>
      <div className="col-span-2 text-primary">Name</div>
      <div className="col-span-2 text-primary">Items count</div>
      <div className="col-span-1 text-primary">Edit</div>
      <div className="col-span-1 text-primary">Delete</div>
    </div>
  );
};

export default CategoryTitleRow;
