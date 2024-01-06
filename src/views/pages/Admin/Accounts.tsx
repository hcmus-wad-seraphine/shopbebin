import { type User } from "@prisma/client";
import { appState } from "@views/valtio";
import { useEffect, useState } from "react";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<User[]>([]);
  const [bannedAccounts, setBannedAccounts] = useState<User[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<User[]>([]);
  const [selectedBannedAccounts, setSelectedBannedAccounts] = useState<User[]>([]);

  const handleUpdateAccounts = async (account: User) => {
    await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appState.profile?.token}`,
      },
      body: JSON.stringify(account),
    });
  };

  const handleAddToBanned = () => {
    selectedAccounts.forEach((account) => {
      account.isBanned = true;
      handleUpdateAccounts(account).catch((err) => {
        console.log(err);
      });
    });

    setBannedAccounts([...bannedAccounts, ...selectedAccounts]);
    setAccounts(accounts.filter((account) => !selectedAccounts.includes(account)));
  };

  const handleAddToUnbanned = () => {
    selectedAccounts.forEach((account) => {
      account.isBanned = false;
      handleUpdateAccounts(account).catch((err) => {
        console.log(err);
      });
    });

    setAccounts([...accounts, ...selectedBannedAccounts]);
    setBannedAccounts(accounts.filter((account) => !selectedBannedAccounts.includes(account)));
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsRes = await fetch("/api/users?role=USER&isBanned=false", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });

      const bannedAccountsRes = await fetch("/api/users?role=USER&isBanned=true", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });

      const [accountsJson, bannedAccountsJson] = await Promise.all([
        accountsRes.json(),
        bannedAccountsRes.json(),
      ]);

      setAccounts(accountsJson);
      setBannedAccounts(bannedAccountsJson);
    };

    fetchAccounts().catch((err) => {
      console.log("------->", err);
    });
  }, []);

  return (
    <div className="w-full gap-10">
      <div className="flex-col flex-1 gap-4">
        <div className="w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Accounts</h1>
          <button
            className="self-start bg-primary py-2 px-4 text-white rounded-full"
            onClick={handleAddToBanned}
          >
            Ban
          </button>
        </div>
        <div>
          {accounts.map((account, index) => (
            <div
              key={index}
              className="justify-between items-center w-full"
            >
              <div className="gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={(isSelected) => {
                    if (isSelected.target.checked) {
                      setSelectedAccounts([...selectedAccounts, account]);
                    }
                  }}
                />
                <div className="justify-center items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={account.avatar}
                    alt=""
                  />
                  <p className="text-lg font-medium">{account.name}</p>
                </div>
              </div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[1px] h-full bg-primary"></div>

      <div className="flex-col flex-1 gap-4">
        <div className="w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Banned accounts</h1>
          <button
            className="self-start bg-primary py-2 px-4 text-white rounded-full"
            onClick={handleAddToUnbanned}
          >
            Unban
          </button>
        </div>
        <div>
          {bannedAccounts.map((account, index) => (
            <div
              key={index}
              className="justify-between items-center w-full"
            >
              <div className="gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={(isSelected) => {
                    if (isSelected.target.checked) {
                      setSelectedBannedAccounts([...selectedBannedAccounts, account]);
                    }
                  }}
                />
                <div className="justify-center items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={account.avatar}
                    alt=""
                  />
                  <p className="text-lg font-medium">{account.name}</p>
                </div>
              </div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
