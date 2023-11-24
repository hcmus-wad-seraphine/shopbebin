import InfoItem from "./InfoItem";

const ShippingInfo = () => {
  return (
    <div className="flex-col w-full max-w-3xl px-8">
      <div className="justify-between text-primary">
        <h1 className="text-primary uppercase font-semibold text-xl">Shipping Info</h1>

        <a className="items-center gap-2">
          <i className="fa-regular fa-pen-to-square text-primary"></i>
          Edit
        </a>
      </div>

      <div className="flex-col">
        <InfoItem
          title="Name"
          value="John Doe"
        />

        <InfoItem
          title="Phone number"
          value="0779944549"
        />

        <InfoItem
          title="Address"
          value="1234 Main St"
        />
      </div>
    </div>
  );
};

export default ShippingInfo;
