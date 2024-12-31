import React, { useEffect } from 'react';
import Navbar from '../shared/navbar';
import ApplicantsTable from './ApplicantsTable';
import { APPLICATION_API_END_POINT } from '@/util/constants';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';
import store from '@/redux/store';
import Footer from '../shared/Footer';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store => store.application);
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                    withCredentials: true,
                });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    },[])
  return (
    <div>
      <Navbar/>
      <div className=' max-w-5xl mx-auto ' >
        <h1 className='font-bold my-5 text-xl ' >Applicants {applicants?.applications?.length} </h1>
        <ApplicantsTable/>
      </div>
      <Footer/>
    </div>
  );
}

export default Applicants;
