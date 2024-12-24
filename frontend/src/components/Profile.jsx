import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import image from "../assets/images/circle-line-simple-design-logo-600nw-2174926871.webp";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";

const skills = ["HTML", "CSS", "JavaScript", "ReactJS"];
console.log(skills); // This will log the array to the console

const Profile = () => {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="bg-white max-w-3xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={image}
                alt="User Avatar"
                className="w-24 h-24"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          <Button variant="outline" className="text-right">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>merci@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2 ">
            <Contact />
            <span>8755664490</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-2">
            {skills.length !== 0 ? (
              skills.map((item, index) => (
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
              href="https://www.google.com/"
              className="text-blue-500 hover:cursor-pointer underline w-full "
            >
              Google
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5" >Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
    </div>
  );
};

export default Profile;
