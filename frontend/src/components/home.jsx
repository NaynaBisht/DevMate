import React, { useEffect } from 'react'
import Navbar from './shared/navbar.jsx'
import HeroSection from './heroSection.jsx'
import CategoryCarousel from './categoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import store from '@/redux/store.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    } 
  }, [])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  );
}

export default Home;
