"use client";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const StudentModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [gender,setGender] = useState("")
  const [dateOfBirth,setDateOfBirth] = useState("")

  const router = useRouter()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
      const res = await axiosInstance.post("/students",{
        name,
        email,
        password,
        phoneNumber: phone,
        address,
        gender: gender.toUpperCase(),
        dateOfBirth
      })
      setIsOpen(false)
      router.refresh()
    }catch(error){
      console.log(error);
    }

  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors duration-300"
      >
        Add Student
      </button>
      {isOpen && (
        <div className={`fixed z-10 inset-0 bg-gray-300/50 backdrop-blur-sm`}>
          <div className="flex justify-center items-center h-screen">
            <div className="max-w-sm w-full border border-gray-300 bg-white mx-auto p-2 ">
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-semibold">Add Student</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-2 space-y-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                    className="border border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentModal;
