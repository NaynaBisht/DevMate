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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();

  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompanies =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompanies);
  }, [companies, searchCompanyByText]);
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
      <Table>
        <TableCaption className="text-xl font-semibold text-orange-700 mb-4">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader className="border-b-2 border-gray-300">
          <TableRow>
            <TableHead className="text-orange-700 text-xl font-bold">
              Logo
            </TableHead>
            <TableHead className="text-orange-700 text-xl font-bold">
              Name
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
          {filterCompany?.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No companies registered yet
              </td>
            </tr>
          ) : (
            filterCompany?.map((company) => (
              <TableRow
                key={company?._id}
                className="hover:bg-teal-50 transition duration-200"
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt="Company Logo" />
                  </Avatar>
                </TableCell>
                <TableCell className="text-black text-lg">
                  {company?.name}
                </TableCell>
                <TableCell className="text-black text-lg">
                  {company?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-teal-600 hover:text-teal-800 transition-colors duration-200" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white shadow-lg rounded-md border border-gray-200">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-teal-50 rounded-md transition-colors duration-200"
                      >
                        <Edit2 className="w-4 text-teal-600" />
                        <span className="text-teal-700 font-medium">Edit</span>
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

export default CompaniesTable;
