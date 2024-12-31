import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const difference = currentTime - createdAt;
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-teal-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-black">
          {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full text-orange-500 border-orange-500" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo}
            alt="Company Logo"
            className="w-full h-full object-contain"
          />
          <AvatarFallback className="bg-yellow-200 text-yellow-700">
            CN
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold text-black">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>

      <div className="font-bold text-lg my-2 text-black">
        <h1>{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex gap-2 items-center mt-4">
        <Badge className="bg-teal-100 text-teal-800 font-bold" variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="bg-orange-100 text-orange-800 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-800 font-bold" variant="ghost">
          {job?.salary}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-teal-700 border-teal-700 hover:bg-teal-700 hover:text-white"
        >
          Details
        </Button>
        <Button className="bg-orange-500 text-white hover:bg-orange-600">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
