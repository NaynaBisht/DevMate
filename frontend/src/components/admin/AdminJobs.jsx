import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  useEffect(()=>{
    dispatch(setSearchJobByText(input))
  },[input]) 
  

  return (
    <div>
  <Navbar />
  <div className="max-w-5xl mx-auto my-10 px-4">
    <div className="flex flex-col sm:flex-row items-center justify-between my-3 gap-4">
      <Input
        placeholder="Filter by job title"
        className="w-full sm:w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-teal-500"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        onClick={() => navigate("/admin/jobs/create")}
        className="bg-orange-500 hover:bg-orange-700 active:bg-teal-800 text-white px-4 py-2 rounded-lg"
      >
        New Job
      </Button>
    </div>
    <AdminJobsTable />
  </div>
  <Footer />
</div>

  );
};

export default AdminJobs;
