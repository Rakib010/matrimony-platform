import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BiodataCard from "./BiodataCard";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { useState } from "react";
import LeftSide from "./LeftSide";

const Biodatas = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filter, setFilter] = useState({
    minAge: "",
    maxAge: "",
    type: "",
    division: "",
  });

  const {
    data: biodatas = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["biodata", page, itemsPerPage, filter],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas", {
        params: {
          page,
          limit: itemsPerPage,
          minAge: filter.minAge,
          maxAge: filter.maxAge,
          type: filter.type,
          division: filter.division,
        },
      });
      return res.data;
    },
    keepPreviousData: true, // This will keep the previous data while waiting for the new data
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading biodatas.</p>;

  return (
    <div className="flex flex-col md:flex-row mt-10 px-4">
      {/* LeftSide (Search/Filter Section) */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
        <LeftSide filter={filter} setFilter={setFilter} />
      </div>

      {/* Biodata Cards Section */}
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {biodatas.data?.map((biodata) => (
            <BiodataCard key={biodata._id} biodata={biodata} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={biodatas.data.length < itemsPerPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
