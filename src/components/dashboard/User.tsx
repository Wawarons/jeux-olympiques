import { ChangeEvent, useEffect, useState } from "react";
import { UserBasic, getUsers } from "../../utils/apiService";
import UserCard from "./UserCard";

const User = () => {
  const [users, setUsers] = useState<UserBasic[]>();
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    const fetchUsers = () => {
      getUsers().then((usersList) => {
        setUsers(usersList);
      });
    };
    fetchUsers();
    ("");
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center shadow-border p-4 w-1/4 mx-auto my-10 rounded-md space-y-5">
        <label htmlFor="name" className="text-blue-500 text-xl font-bold">Find user</label>
        <input
          type="text"
          placeholder="name"
          name="search"
          id="search"
          className="rounded-md p-2 w-full bg-gray-200"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
          }}
        />
      </div>
      <div className="form-shadow w-11/12 md:w-3/4 mx-auto my-10 rounded-lg">
        <div className="flex w-full mx-auto text-center bg-blue-500 text-white rounded-t-lg">
          <p className="w-1/4 text-lg font-semibold mx-auto p-2">Name</p>
          <p className="w-1/4 text-lg font-semibold mx-auto p-2">Firstname</p>
          <p className="w-1/4 text-lg font-semibold mx-auto p-2">Blocked</p>
          <p className="w-1/4 text-lg font-semibold mx-auto p-2">Verified</p>
        </div>
        {!searchValue &&
          users?.map((user) => {
            return (
              <div className="mx-auto" key={user.id}>
                <UserCard user={user} />
              </div>
            );
          })}
        {searchValue &&
          users
            ?.filter((user) => {
              return (
                user.name.toLowerCase().includes(searchValue) ||
                user.firstname.toLowerCase().includes(searchValue)
              );
            })
            .map((user) => {
              return (
                <div className="mx-auto" key={user.id}>
                  <UserCard user={user} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default User;
