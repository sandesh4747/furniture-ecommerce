import React, { useState } from "react";
import p1 from "../../../assets/img/avatar.png";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import {
  useChangePasswordMutation,
  useUserLogoutMutation,
} from "../../../pages/Auth-Page/authApi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/user/userSlice";
import { FaCamera, FaTimes } from "react-icons/fa";

import { useUpdateProfilePicMutation } from "../../../features/user/userApi";

export default function Profile() {
  const [updateProfilePic] = useUpdateProfilePicMutation();
  const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changePassword] = useChangePasswordMutation();
  const [logout, { isLoading }] = useUserLogoutMutation();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await changePassword({ newPassword }).unwrap();
      await logout().unwrap();
      navigate("/");
      dispatch(setUser(null));

      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await updateProfilePic(formData).unwrap();

      console.log("Profile Pic Response:", response);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="  flex lg:flex-row flex-col  gap-8">
      <div className=" lg:w-full  pt-12 bg-white px-4 pb-4 shadow-lg rounded-sm">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer block w-full h-full ">
            <div className="flex justify-center">
              {" "}
              {user ? (
                <img
                  src={user.profilePic?.url || p1}
                  alt="profile avatar"
                  className="w-30 h-30 rounded-lg mb-4"
                />
              ) : null}
            </div>

            <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600">
              <FaCamera />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <h1 className="text-2xl mb-4 capitalize">{user?.username}</h1>
          <p className="text-sm text-[#8592A3] px-3 py-1 bg-gray-200 inline-block rounded-lg">
            {user?.role}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium  text-[#384551] border-b border-gray-200 pb-4 mb-4">
            Account Details
          </h2>
          <div>
            <p className="mb-2">
              <span className="text-[#384551] font-medium">Username:</span>
              <span className="text-[#646E78] capitalize">
                {" "}
                {user?.username}
              </span>
            </p>
            <p className="mb-2">
              <span className="text-[#384551] font-medium">Email:</span>
              <span className="text-[#646E78]"> {user?.email}</span>
            </p>
            <p className="mb-2">
              <span className="text-[#384551] font-medium">Status:</span>
              <span className="text-[#646E78]"> {user?.status}</span>
            </p>
            <p className="mb-2">
              <span className="text-[#384551] font-medium">Role:</span>
              <span className="text-[#646E78]"> {user?.role}</span>
            </p>
          </div>
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setShowEditProfile(true)}
              className="bg-[#FFAB00] text-white py-2 px-6 rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="w-full bg-white px-6 py-12 rounded-sm shadow-lg ">
        <h3 className="text-lg text-[#384551] ">Change Password</h3>

        <div className="bg-[#FFF2D6] rounded-lg py-4 px-4 mt-6 text-[#384551]">
          {" "}
          <h1 className="text-lg text-[#FAAB00] mb-2">
            Ensure that these requiredments are met
          </h1>
          <p className="text-[15px] text-[#FAAB00]">
            Minimum 8 characters long,uppercase & symbol
          </p>
        </div>

        <form
          onSubmit={handleChangePassword}
          className="flex flex-col w-full gap-4 mt-2"
        >
          <div className="flex flex-col sm:flex-row  w-full gap-4 mt-8">
            <div className="flex gap-1 flex-col flex-1">
              <label htmlFor="new password" className="text-[#384551] text-sm">
                New Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  id="new password"
                  placeholder="********"
                  type={showNewPassword ? "text" : "password"}
                  className="w-full py-[0.6rem] px-3 border-2 border-gray-300 rounded-lg focus:shadow-sm leading-[normal]"
                />
                {newPassword &&
                  (showNewPassword ? (
                    <Eye
                      onClick={() => setShowNewPassword(false)}
                      className="absolute right-4 top-2 cursor-pointer"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setShowNewPassword(true)}
                      className="absolute right-4 top-2 cursor-pointer"
                    />
                  ))}
              </div>
            </div>

            <div className="flex gap-1 flex-col flex-1 ">
              <label
                htmlFor="confirm new password"
                className="text-[#384551] text-sm"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  id="confirm new password"
                  placeholder="*********"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full py-[0.6rem] px-3 border-2 border-gray-300 rounded-lg focus:shadow-sm leading-[normal]"
                />
                {confirmPassword &&
                  (showConfirmPassword ? (
                    <Eye
                      onClick={() => setShowConfirmPassword(false)}
                      className="absolute right-4 top-2 cursor-pointer"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setShowConfirmPassword(true)}
                      className="absolute right-4 top-2 cursor-pointer"
                    />
                  ))}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#FFAB00] text-white py-2 px-6 rounded-lg hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {" "}
              Change Password
            </button>
          </div>
        </form>
      </div>
      {showEditProfile && (
        <div
          onClick={() => setShowEditProfile(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/15 backdrop-blur-[2px]"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EditProfile setShowEditProfile={setShowEditProfile} />
          </div>
        </div>
      )}
    </div>
  );
}
