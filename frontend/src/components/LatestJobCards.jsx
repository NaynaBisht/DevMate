import React from "react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import image from "../assets/images/circle-line-simple-design-logo-600nw-2174926871.webp";

import { useNavigate } from 'react-router-dom';
const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl border bg-white border-gray-100 cursor-pointer">
      <div className="flex items-center gap-2 my-2">
        {/* Avatar outside Button */}
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo || image}
            alt="Company Logo"
            className="w-full h-full object-contain"
          />
          <AvatarFallback className="bg-gray-300 text-gray-500">
            CN
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">{ job?.company?.name }</h1>
          <p>{ job?.location }</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2"> {job?.title } </h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className=" text-blue-700 font-bold" variant="ghost"> {job?.position} </Badge>
        <Badge className=" text-red-700 font-bold" variant="ghost">  {job?.jobType} </Badge>
        <Badge className=" text-purple-700 font-bold" variant="ghost"> {job?.salary}LPA </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
