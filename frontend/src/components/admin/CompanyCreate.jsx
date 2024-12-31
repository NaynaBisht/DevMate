import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";


const CompanyCreate = () => {

  const navigate = useNavigate();

  const [companyName, setCompanyName] =useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: true            
        })
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company))
            toast.success(res.data.message)
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`)
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
  <Navbar />
  <div className="max-w-3xl mx-auto px-4">
    {/* Header Section */}
    <div className="my-10 text-center">
      <h1 className="font-bold text-2xl text-orange-600">Your Company Name</h1>
      <p className="text-gray-600">
        What would you like to give your company name?
      </p>
    </div>

    {/* Form Section */}
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Label className="text-lg font-semibold text-gray-700">
        Company Name
      </Label>
      <Input
        placeholder="Enter your company name"
        type="text"
        className="my-2 border border-gray-300 rounded-md p-3 focus:ring-teal-500 focus:outline-none w-full"
        onChange={(e) => setCompanyName(e.target.value)}
      />

      {/* Actions */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          variant="outline"
          className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
          onClick={() => navigate("/admin/companies")}
        >
          Cancel
        </Button>
        <Button
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 active:bg-teal-800"
          onClick={registerNewCompany}
        >
          Continue
        </Button>
      </div>
    </div>
  </div>
</div>

  );
};

export default CompanyCreate;
