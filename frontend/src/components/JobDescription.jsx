import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import Navbar from "../components/shared/navbar";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex itexms-center justify-between">
          <div>
            <h1 className="font-bold text-2xl"> {singleJob?.title} </h1>
            <div className="flex gap-2 items-center mt-4">
              <Badge
                className="bg-teal-100 text-teal-800 font-bold"
                variant="ghost"
              >
                {singleJob?.position}
              </Badge>
              <Badge
                className="bg-orange-100 text-orange-800 font-bold"
                variant="ghost"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="bg-yellow-100 text-yellow-800 font-bold"
                variant="ghost"
              >
                {singleJob?.salary}
              </Badge>
            </div>
          </div>
          <Button
            onClick={isInitiallyApplied ? null : applyJobHandler}
            disabled={isInitiallyApplied}
            className={`rounded-lg ${
              isInitiallyApplied
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-700"
            } `}
          >
            {isInitiallyApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 py-4 border-b-gray-300 font-medium text-xl">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 ">
            Role:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Location:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Description:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Salary:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.salary}LPA
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Experience:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.experienceLevel}years
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Total Applicants:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Posted Date:
            <span className=" pl-4 font-normal text-gray-800 ">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
