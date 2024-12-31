import { React, useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../util/constants";
import { toast } from "sonner";
import Navbar from "../shared/navbar.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chageFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-teal-400 rounded-lg shadow-lg p-6 my-10 bg-teal-50"
        >
          <h1 className="font-bold text-2xl mb-5 text-teal-800 text-center">
            Create an Account
          </h1>

          <div className="my-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Phone Number</Label>
            <Input
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter a password"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Role</Label>
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-teal-600"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-teal-600"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="my-4">
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={chageFileHandler}
              className="cursor-pointer border-teal-400"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-teal-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
              Account...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Sign Up
            </Button>
          )}

          <div className="text-center mt-4">
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-700 font-semibold">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
