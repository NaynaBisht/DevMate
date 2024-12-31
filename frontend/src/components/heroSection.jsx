import React, { useState } from "react";
import {Button} from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch ();
  const navigate = useNavigate();
  const searchJobHandler = () =>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className="text-center bg-teal-700 text-white py-12">
      <div className="flex flex-col gap-6  mx-auto max-w-4xl">
        {/* Tagline */}
        <span className="mx-auto px-4 py-2 rounded-full bg-teal-500 text-white font-bold text-lg shadow-md">
          Your Gateway to Endless Opportunities
        </span>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Discover, Collaborate & <br />
          Land Your <span className="text-yellow-400">Dream Job</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-200 text-lg md:text-xl">
          Elev8Jobs connects talented individuals with top recruiters. 
          Start your journey towards an amazing career today!
        </p>

        {/* Search Bar */}
        <div className="flex w-[90%] md:w-[50%] shadow-lg border border-teal-500 rounded-full items-center gap-4 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find Your Dream Job"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 rounded-l-full outline-none"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-orange-400 hover:bg-orange-500 transition-all duration-300"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
