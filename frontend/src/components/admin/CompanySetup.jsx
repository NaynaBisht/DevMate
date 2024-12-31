import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import store from "@/redux/store";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import Footer from "../shared/Footer";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-teal-400 rounded-lg shadow-lg p-6 my-10 bg-teal-50"
        >
          <h1 className="font-bold text-2xl mb-5 text-orange-600 text-center">
            Company Setup
          </h1>

          <div className="my-4">
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter company description"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Enter company website"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter company location"
              className="border-teal-400"
            />
          </div>

          <div className="my-4">
            <Label>Logo</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={changeFileHandler}
              className="cursor-pointer border-teal-400"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-teal-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CompanySetup;
