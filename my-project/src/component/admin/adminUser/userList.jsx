import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../commonComponent/sideBar";




function UserList() {
    const [user, setUser] = useState([])


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("http://localhost:3000/users")
            setUser(res.data)
        }
        fetchUsers()
    }, [])


    const handleBlockToggle = async (index) => {
        const updatedUsers = [...user];
        const selectedUser = updatedUsers[index];

        selectedUser.isBlocked = !selectedUser.isBlocked;

        try {
            setUser(updatedUsers);

            await axios.patch(`http://localhost:3000/users/${selectedUser.id}`, {
                isBlocked: selectedUser.isBlocked,
            });

            console.log("User status updated in DB");
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };


    return <div className="flex min-h-screen">
        <div className="w-64">
            <Sidebar />
        </div>
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">User List</h2>
            <div className="space-y-4">
                {user.map((u, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border hover:shadow-md transition"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-gray-700">{u.username}</span>
                                <span className="text-sm text-gray-500">{u.email}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleBlockToggle(index)}
                            className={`mt-3 sm:mt-0 px-4 py-2 rounded text-white font-medium transition
                            ${u.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                        >
                            {u.isBlocked ? "Unblock" : "Block"}
                        </button>
                    </div>
                ))}

            </div>
        </div>

    </div>

}


export default UserList