import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(
            searchJobByText.toLowerCase() ||
              job?.company?.name
                .toLowerCase()
                .includes(searchJobByText.toLowerCase())
          );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      <Table>
        <TableCaption className="text-xl font-semibold text-orange-700 mb-4">
          A list of your recent posted Jobs
        </TableCaption>
        <TableHeader className="border-b-2 border-gray-300">
          <TableRow>
            <TableHead className="text-orange-700 text-xl font-bold">
              Company Name
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Role
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Date
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No jobs posted yet
              </td>
            </tr>
          ) : (
            filterJobs?.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-teal-50 transition duration-200"
              >
                <TableCell className="text-black text-lg">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="text-black text-lg">
                  {job?.title}
                </TableCell>
                <TableCell className="text-black text-lg">
                  {job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-teal-600 hover:text-teal-800 transition-colors duration-200" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white shadow-lg rounded-md border border-gray-200">
                      <div
                        onClick={() => navigate(`/admin/jobs/create`)}
                        className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-teal-50 rounded-md transition-colors duration-200"
                      >
                        <Edit2 className="w-4 text-teal-600" />
                        <span className="text-teal-700 font-medium">Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-teal-50 rounded-md transition-colors duration-200"
                      >
                        <Eye className="w-4 text-teal-600" />
                        <span className="text-teal-700 font-medium">
                          Applicants
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
