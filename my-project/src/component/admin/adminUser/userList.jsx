import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../commonComponent/sideBar";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:9999/admin/get-users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleBlockToggle = async (userId, index) => {
    try {
      const res = await axios.patch(`http://localhost:9999/admin/toggle-block/${userId}`);
      const updatedUsers = [...users];
      updatedUsers[index].isBlocked = res.data.isBlocked;
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User List</h2>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => handleBlockToggle(user._id, index)}
                className={`mt-2 sm:mt-0 px-4 py-2 rounded text-white transition
                  ${user.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
