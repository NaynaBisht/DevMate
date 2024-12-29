import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    requirements:[{
        type: String,
    }],
    salary:{
        type: Number,
        required: true,
    },
    experienceLevel:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true,
    },
    jobType:{
        type: String,
        // enum: ['full-time', 'part-time', 'internship'],
        required: true,
    },
    position:{
        type: Number,
        required: true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }],
},{timestamps: true});
export const Job = mongoose.model('Job', jobSchema);