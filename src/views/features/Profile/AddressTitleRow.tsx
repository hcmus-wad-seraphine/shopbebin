const AddressTitleRow = () => {
  return (
    <div className="grid grid-cols-8 gap-4 font-semibold w-full">
      <div className="col-span-1">No</div>
      <div className="col-span-2">Street</div>
      <div className="col-span-2">District</div>
      <div className="col-span-2">City</div>
      <div className="col-span-1">Delete</div>
    </div>
  );
};

export default AddressTitleRow;
