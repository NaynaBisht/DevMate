import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import image from "../assets/images/circle-line-simple-design-logo-600nw-2174926871.webp";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "1234";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p>2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        {/* Avatar outside Button */}
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={image}
            alt="Company Logo"
            className="w-full h-full object-contain"
          />
          <AvatarFallback className="bg-gray-300 text-gray-500">
            CN
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">Company Name</h1>
          <p>India</p>
        </div>
      </div>

      <div className="font-bold text-lg my-2">
        <h1>Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
      </div>

      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-purple-700 font-bold" variant="ghost">
          24LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button onClick = {() => navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-purple-700 text-white">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
