import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";   
import { toast } from "sonner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchAppliedJobs();
    }, []);
}
export default useGetAppliedJobs;