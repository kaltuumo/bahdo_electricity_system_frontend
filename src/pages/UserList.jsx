import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/input";
import Label from "../components/ui/Label";
import api from "../api/api";
import { ApiConstants } from "../api/ApiConstants";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Form values
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  // Load sample users
  useEffect(() => {
    setUsers([
      {
        userId: "6925a7fb8a2ecf92cb6059ca",
        fullname: "Kaltuumo",
        email: "kaltuumo905@gmail.com",
        phone: "619050040",
        createdDate: "2025-11-25",
      },
    ]);
  }, []);

  // =========================
  // GET ALL USERS
  // =========================
 const fetchUsers = async () => {
  try {
    const res = await api.get(`${ApiConstants.customerEndpoint}/all-customer`);
    const data = res.data;

    if (data.success) {
      setUsers(data.data);
    }
  } catch (err) {
    console.log("Fetch users error:", err);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);


  // =============================
  //   REGISTER USER FUNCTION
  // =============================
  const handleRegisterUser = async () => {
    if (!fullname || !phone || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
    
const res = await api.post(`${ApiConstants.userEndpoint}/signup`,        {
          fullname,
          phone,
          email,
          password,
        }
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        alert("User Created Successfully!");

        // Add new user to table
        setUsers((prev) => [
          ...prev,
          {
            userId: res.data.result._id,
            fullname: res.data.result.fullname,
            email: res.data.result.email,
            phone: res.data.result.phone,
            createdDate: res.data.result.createdDate,
          },
        ]);

        // Clear inputs
        setFullname("");
        setPhone("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      alert("Error Creating User");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white bg-gradient-to-r from-[#357d95] to-blue-500 p-4 rounded-lg shadow-lg">
        Users List
      </h1>

      {/* Search */}
      <div className="mb-6 w-full flex items-end justify-between gap-4">
        <div className="flex-1">
          <Label text="Search User" />
          <InputField
            placeholder="Search by fullname..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Register Form */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Fullname" />
          <InputField
            type="text"
            placeholder="Enter fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Phone" />
          <InputField
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Email" />
          <InputField
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <Label text="Password" />
          <InputField
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <Button
          onClick={handleRegisterUser}
          className="!w-auto px-6 py-2 rounded-lg shadow bg-[#357d95] text-white hover:bg-[#2b6473]"
        >
          {loading ? "Saving..." : "Register User"}
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full border-collapse">
          <thead>
            <tr
              className="text-white uppercase text-sm tracking-wider"
              style={{
                background: "linear-gradient(to right, #357d95, #4a90e2)",
              }}
            >
              <th className="border p-3 text-left">Full Name</th>
              <th className="border p-3 text-left">Gender</th>
              <th className="border p-3 text-left">Phone</th>
              <th className="border p-3 text-left">Created Date</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((u) =>
                u.fullname.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <tr
                  key={user.userId}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100 hover:bg-gray-200"}
                >
                  <td className="border p-3">{user.fullname}</td>
                  <td className="border p-3">{user.gender}</td>
                  <td className="border p-3">{user.phone}</td>
                  <td className="border p-3">{user.createdDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
