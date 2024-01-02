const AdminDashboard = () => {
  return (
    <div className="w-full gap-10">
      <div className="flex-col w-[60%]">
        <h1>Report revenue</h1>

        <select className="self-start">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>

        <div></div>
      </div>

      <div className="flex-col w-[40%]">
        <h1>Today orders</h1>
        <div className="flex-col overflow-scroll"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
