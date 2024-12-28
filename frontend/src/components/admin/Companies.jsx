import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";


const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input]) 

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto my-10">
        <div className="flex items-center justify-between my-3">
          <Input placeholder="Filter by name" className="w-fit"
             onChange = {(e) => setInput(e.target.value)} 
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-black text-white"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
