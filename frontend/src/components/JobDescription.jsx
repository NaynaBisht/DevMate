import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex itexms-center justify -between">
        <div>
          <h1 className="font-bold text-xl">Frontend Developer</h1>
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
        </div>

        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-purple-700 text-white hover:bg-purple-800"
          } `}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 py-4 border-b-gray-300 font-medium">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 ">Role: <span className=" pl-4 font-normal text-gray-800 ">Frontend Developer</span> </h1>
        <h1 className="font-bold my-1 ">Location: <span className=" pl-4 font-normal text-gray-800 ">Bangalore</span> </h1>
        <h1 className="font-bold my-1 ">Description: <span className=" pl-4 font-normal text-gray-800 ">Lorem ipsum dolor sit.</span> </h1>
        <h1 className="font-bold my-1 ">Salary: <span className=" pl-4 font-normal text-gray-800 ">24LPA</span> </h1>
        <h1 className="font-bold my-1 ">Experience: <span className=" pl-4 font-normal text-gray-800 ">2-4 years</span> </h1>
        <h1 className="font-bold my-1 ">Total Applicants: <span className=" pl-4 font-normal text-gray-800 ">4</span> </h1>
        <h1 className="font-bold my-1 ">Posted Date: <span className=" pl-4 font-normal text-gray-800 ">1-04-2024 </span> </h1> 

      </div>
    </div>
  );
};

export default JobDescription;
