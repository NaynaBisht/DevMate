import { JOB_API_END_POINT } from '@/util/constants';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import { useSearchParams } from 'react-router-dom';
import store from '@/redux/store';

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(store => store.job);
    useEffect(()=>{
        const fetchAllJobs = async () =>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{
                    withCredentials: true
                });
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, []);
}

export default useGetAllJobs;
