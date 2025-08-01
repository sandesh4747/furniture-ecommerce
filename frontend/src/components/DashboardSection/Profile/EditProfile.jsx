import { Input, Option, Select } from "@material-tailwind/react";
import { Loader, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../features/user/userApi";
import toast from "react-hot-toast";
import { useUserLogoutMutation } from "../../../pages/Auth-Page/authApi";
import { setUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ setShowEditProfile }) {
  const [logout] = useUserLogoutMutation();
  const { user } = useSelector((state) => state.userSlice);

  const [updateUser, { isLoading }] = useUpdateProfileMutation();
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [status, setStatus] = useState(user?.status || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ email, username, status }).unwrap();

      if (email !== user.email) {
        dispatch(setUser(null));
        await logout().unwrap();
        window.location.href = "/";
      }

      setShowEditProfile(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className=" ">
      <div className="shadow-lg rounded-sm bg-white  p-4 w-full max-w-[800px] relative">
        <div className="p-4">
          <div className="mb-6 flex flex-col items-center">
            <h4 className="text-2xl font-medium text-[#384551] mb-2">
              Edit User Information
            </h4>
            <p className="text-base text-[#646E78] mb-4">
              Updating user details will receive a privacy audit
            </p>
          </div>

          <form onSubmit={handleUpdateUser} className="w-full">
            <div className="flex flex-col gap-6">
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="text-[#384551] text-[13px]"
                >
                  Username
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Doe"
                  className="mt-2 placeholder:opacity-100 !border-2 !border-gray-400/70  focus:!border-black focus:!ring-0  rounded-md focus:shadow-lg"
                  labelProps={{ className: "hidden" }}
                />
              </div>

              <div className=" gap-6 flex flex-col md:flex-row">
                <div className="flex-1">
                  <label htmlFor="email" className="text-[#384551] text-[13px]">
                    Email
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="Doe"
                    className="mt-2 placeholder:opacity-100 !border-2 !border-gray-400/70  focus:!border-black focus:!ring-0  rounded-md focus:shadow-lg"
                    labelProps={{ className: "hidden" }}
                  />
                </div>

                <div className="flex-1">
                  <p className="text-[#384551] text-[13px]">Status</p>{" "}
                  <div className="mt-2">
                    <Select
                      value={status}
                      onChange={(value) => setStatus(value)}
                      label=""
                      className="!border-2 !border-gray-400/70 focus:!border-black focus:!ring-0 hover:!border-black rounded-md"
                      labelProps={{ className: "hidden" }}
                    >
                      <Option value="active">Acitve</Option>
                      <Option value="inactive">Inactive</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowEditProfile(false)}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#FFAB00] text-white py-2 px-6 rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <Loader />
                    Updating..."
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
        <div
          onClick={() => setShowEditProfile(false)}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <X />
        </div>
      </div>
    </div>
  );
}
