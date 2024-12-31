import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Footer from "../shared/Footer";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto my-10 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between my-3 gap-4">
          <Input
            placeholder="Filter by name"
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-teal-500"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-orange-500 hover:bg-orange-700 active:bg-teal-800 text-white px-4 py-2 rounded-lg"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
      <Footer />
    </div>
  );
};

export default Companies;
