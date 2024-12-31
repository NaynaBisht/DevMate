import { React, useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../util/constants";
import { useNavigate } from "react-router-dom";

import Navbar from "../shared/navbar.jsx";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        Headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
    if(user){
      navigate('/')
    }
  });

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-teal-500 rounded-lg shadow-lg p-6 my-10 bg-teal-50"
        >
          <h1 className="font-bold text-2xl mb-5 text-teal-700 text-center">
            Welcome Back!
          </h1>

          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="border-teal-500"
            />
          </div>

          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="border-teal-500"
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

          {loading ? (
            <Button className="w-full my-4 bg-teal-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Login
            </Button>
          )}

          <div className="text-center mt-4">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-teal-700 font-semibold">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
