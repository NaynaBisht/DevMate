import {Application} from "../models/applications.model.js";
import {Job} from "../models/job.model.js";
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const {id:jobId} = req.params; // const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }

        // check if user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        // check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        
        // create a new application
        const newApplication = await Application.create ({
            job: jobId,
            applicant: userId
        });

        // add the application to the job
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Applied successfully",
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

export const getApplications = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({
            applicant: userId
        }).sort({createdAt: -1}).populate({
            path: 'job',
            options : { sort: { 'createdAt': -1 } },
            populate: {
                path: 'company',
                options : { sort: { 'createdAt': -1 } },
            }
        });

        if(!application){
            return res.status(404).json({
                message: "No applications found",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true,
        }) 

    } catch (error) {
        console.log(error);
        
    }
}

//  for admin to see how many have applied
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options : { sort: { 'createdAt': -1 } },
            populate: {
                path: 'applicant',
            }
        });

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


// updata the status of the application
export const updateStatus = async (req, res) => {
    try {
        const status = req.body.status;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }
        // find the application by id
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
        })

    } catch (error) {   
        console.log(error);
    }
}

