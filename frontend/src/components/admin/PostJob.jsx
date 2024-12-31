import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const companyArray = [];
const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: 0,
    experienceLevel: 0,
    position: 0,
    jobType: "",
    requirements: [],
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const { companies } = useSelector((store) => store.company);

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl border border-teal-400 shadow-lg rounded-lg bg-teal-50 p-8"
        >
          <h1 className="font-bold text-3xl mb-5 text-orange-600 text-center">
            Post a New Job
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter job description"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Enter job requirements"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter salary"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter job location"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Enter job type (e.g., Full-time)"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                placeholder="Enter experience level"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter number of positions"
                className="border-teal-400 focus:ring-teal-500 focus:border-teal-500 my-1"
              />
            </div>
            {companies.length > 0 && (
              <div className="col-span-2">
                <Label>Select a Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full border-teal-400 focus:ring-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company?.name}
                          className="cursor-pointer"
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-teal-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting Job...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
