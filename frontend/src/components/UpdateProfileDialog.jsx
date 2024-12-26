import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant"; 
import { setUser } from "../redux/authSlice";




const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true)
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
    setOpen(false);

    console.log(input);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-white sm:max-w-[425px]"
          onInteractionOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className=" grid gap-4 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Name"
                  className=" border rounded-md p-2 border-black col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Email"
                  className="col-span-3 border rounded-md p-2 border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <input
                  type="Number"
                  name="number"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="Number"
                  id="number"
                  className="col-span-3 border rounded-md p-2 border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  placeholder="Bio"
                  className="col-span-3 border rounded-md p-2 border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  placeholder="Skills"
                  className="col-span-3 border rounded-md p-2 border-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <input
                  type="file"
                  id="resume"
                  name="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  placeholder="Resume"
                  className="col-span-3 border rounded-md p-2 border-black"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 bg-black text-white">
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> Please
                  Wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-[#6A38C2] my-4 text-white"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialogue;
