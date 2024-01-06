const OrderTitleRow = () => {
  return (
    <div className="grid grid-cols-12 gap-4 font-semibold">
      <div className="col-span-1">Detail</div>
      <div className="col-span-1">Order ID</div>
      <div className="col-span-1">Customer ID</div>
      <div className="col-span-1">Price</div>
      <div className="col-span-2">Address</div>
      <div className="col-span-2">Payment Method</div>
      <div className="col-span-2">Created At</div>
      <div className="col-span-2">Status</div>
    </div>
  );
};

export default OrderTitleRow;
