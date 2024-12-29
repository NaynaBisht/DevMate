import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import image from "../assets/images/circle-line-simple-design-logo-600nw-2174926871.webp";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["HTML", "CSS", "JavaScript", "ReactJS"];
// console.log(skills); // This will log the array to the console

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="bg-white max-w-3xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="User Avatar"
                className="w-24 h-24"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl"> {user?.fullname} </h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="text-right"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 ">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge className="bg-black text-white" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className=" grid w-full max-w-sm items-center gap-1 ">
          <Label className=" text-md font-bold ">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume} // Ensure this is a PDF URL
              className="text-blue-500 hover:cursor-pointer underline w-full"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
