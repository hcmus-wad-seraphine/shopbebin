const AccountsPage = () => {
  return (
    <div className="w-full gap-10">
      <div className="flex-col flex-1 gap-4">
        <div className="w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Accounts</h1>
          <button className="self-start bg-primary py-2 px-4 text-white rounded-full">Ban</button>
        </div>
        <div>
          <div className="justify-between items-center w-full">
            <div className="gap-2 items-center">
              <input type="checkbox" />
              <label>accoutn@gmail.com</label>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <div className="w-[1px] h-full bg-primary"></div>

      <div className="flex-col flex-1 gap-4">
        <div className="w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Banned accounts</h1>
          <button className="self-start bg-primary py-2 px-4 text-white rounded-full">Unban</button>
        </div>
        <div>
          <div className="justify-between items-center w-full">
            <div className="gap-2 items-center">
              <input type="checkbox" />
              <label>accoutn@gmail.com</label>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
