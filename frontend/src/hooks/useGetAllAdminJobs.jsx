import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '@/redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllAdminJobs = async () =>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{
                    withCredentials: true
                });
                console.log("API Response:", res.data);
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }else {
                    console.log("Failed to fetch jobs:", res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, []);
}

export default useGetAllAdminJobs;
