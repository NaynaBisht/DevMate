import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
      <Table>
        <TableCaption className="text-xl font-semibold text-orange-700 mb-4">
          List Of Your Applied Jobs
        </TableCaption>
        <TableHeader className="border-b-2 border-gray-300">
          <TableRow>
            <TableHead className="text-orange-700 text-xl font-bold">
              Date
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Job Role
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Company
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                You haven't applied to any jobs
              </td>
            </tr>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob?._id}
                className="hover:bg-teal-50 transition duration-200"
              >
                <TableCell className="text-black">
                  {appliedJob?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-black">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-black">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500 text-white"
                        : appliedJob?.status === "pending"
                        ? "bg-gray-200 text-black"
                        : "bg-teal-600 text-white"
                    } rounded-full px-4 py-1 text-sm`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
