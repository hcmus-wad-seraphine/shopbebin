const CategoryTitleRow = () => {
  return (
    <div className="grid grid-cols-8 gap-4 font-semibold">
      <div className="col-span-2">ID</div>
      <div className="col-span-2">Name</div>
      <div className="col-span-2">Items count</div>
      <div className="col-span-1">Edit</div>
      <div className="col-span-1">Delete</div>
    </div>
  );
};

export default CategoryTitleRow;
