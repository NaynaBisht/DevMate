import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-teal-700 shadow-md py-1">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16 px-5">
        {/* Logo */}
        <div>
          <h1 className="text-4xl text-yellow-400 font-bold transition-all duration-300 hover:text-yellow-500">
            Elev8<span className="text-white">Jobs</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-orange-400 text-md transition-all duration-300"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-orange-400 text-md transition-all duration-300"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-orange-400 text-md transition-all duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-orange-400 text-md transition-all duration-300"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-orange-400 text-md transition-all duration-300"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white text-md hover:text-teal-700">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-orange-500 hover:bg-orange-700 text-white text-md transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            // Profile Dropdown
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-64 bg-white shadow-md rounded-md p-4">
                {/* User Info */}
                <div className="flex items-center gap-3 border-b pb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                {/* Dropdown Options */}
                <div className="flex flex-col mt-3 text-gray-700">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-teal-700">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                    <LogOut />
                    <Button variant="link" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
