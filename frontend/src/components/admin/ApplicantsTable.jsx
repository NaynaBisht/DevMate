import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { space } from "postcss/lib/list";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/util/constants";
import Footer from "../shared/Footer";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto my-12">
      <Table>
        <TableCaption className="text-xl font-semibold text-orange-700 mb-4">
          A list of your recent applied users
        </TableCaption>
        <TableHeader className="border-b-2 border-gray-300">
          <TableRow>
            <TableHead className="text-orange-700 text-xl font-bold">
              Full Name
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Email
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Contact
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Resume
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
          {applicants?.applications?.length <= 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No applications yet
              </td>
            </tr>
          ) : (
            applicants?.applications?.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-teal-50 transition duration-200"
              >
                <TableCell className="text-black text-lg">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="text-black text-lg">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="text-black text-lg">
                  {item?.applicant?.phoneNumber}
                </TableCell>

                <TableCell className="text-blue-600 cursor-pointer underline">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>No Resume</span>
                  )}
                </TableCell>

                <TableCell className="text-black text-lg">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-teal-600 hover:text-teal-800 transition-colors duration-200" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white shadow-lg rounded-md border border-gray-200">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item._id)}
                          key={index}
                          className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-teal-50 rounded-md transition-colors duration-200"
                        >
                          <span className="text-teal-700 font-medium">
                            {status}
                          </span>
                        </div>
                      ))}
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

export default ApplicantsTable;
