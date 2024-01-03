const AdminDashboard = () => {
  return (
    <div className="w-full gap-10 py-10">
      <div className="flex-col w-[60%] gap-4">
        <h1 className="text-2xl font-semibold">Report revenue</h1>

        <select className="self-start border-2 border-primary rounded-full px-2">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>

        <div></div>
      </div>

      <div className="flex-col w-[40%]">
        <h1 className="text-2xl font-semibold">Today orders</h1>
        <div className="flex-col overflow-scroll"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
