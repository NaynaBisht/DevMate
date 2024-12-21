import express from 'express';  

import isAuthenticated from '../middleware/isAuthenticated.js';
import { getApplicants, updateStatus, getApplications, applyJob } from '../controller/applications.controller.js';

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getApplications);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);


export default router;