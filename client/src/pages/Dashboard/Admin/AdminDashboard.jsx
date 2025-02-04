import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import LoadingSpinner from "./../../../components/spinner/LoadingSpinner";
import {
  FaUsers,
  FaMale,
  FaFemale,
  FaStar,
  FaDollarSign,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import SuccessStories from "./SuccessStories";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  //  biodata stats
  const { data: biodataStats = {}, isLoading: biodataLoading } = useQuery({
    queryKey: ["biodataStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodata-stats");
      return res.data;
    },
  });

  //  total revenue
  const { data: totalRevenue = 0, isLoading: revenueLoading } = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/revenue");
      return res.data.totalRevenue;
    },
  });

  if (biodataLoading || revenueLoading) {
    return <LoadingSpinner />;
  }

  // Pie chart data
  const pieChartData = [
    { name: "Total Biodata", value: biodataStats.totalBiodata },
    { name: "Male Biodata", value: biodataStats.maleBiodata },
    { name: "Female Biodata", value: biodataStats.femaleBiodata },
    { name: "Premium Biodata", value: biodataStats.premiumBiodata },
    {
      name: "Revenue",
      value: totalRevenue,
    },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={8}
        fontWeight="bold"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Total Biodata Count */}
        <div className="bg-gray-50 border p-6 rounded-lg text-center hover:shadow-xl transition-shadow">
          <div className="text-5xl text-gray-600 mb-4">
            <FaUsers />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Total Biodata
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            {biodataStats.totalBiodata}
          </p>
        </div>

        {/* Male Biodata Count */}
        <div className="bg-gray-50 p-6 rounded-lg border text-center hover:shadow-xl transition-shadow">
          <div className="text-5xl text-blue-500 mb-4">
            <FaMale />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Male Biodata
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            {biodataStats.maleBiodata}
          </p>
        </div>

        {/* Female Biodata Count */}
        <div className="bg-gray-50 border p-6 rounded-lg text-center hover:shadow-xl transition-shadow">
          <div className="text-5xl text-pink-500 mb-4">
            <FaFemale />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Female Biodata
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            {biodataStats.femaleBiodata}
          </p>
        </div>

        {/* Premium Biodata Count */}
        <div className="bg-gray-50 border p-6 rounded-lg text-center hover:shadow-xl transition-shadow">
          <div className="text-5xl text-yellow-500 mb-4">
            <FaStar />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Premium Biodata
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            {biodataStats.premiumBiodata}
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gray-50 border p-6 rounded-lg text-center hover:shadow-xl transition-shadow">
          <div className="text-5xl text-green-500 mb-4">
            <FaDollarSign />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Total Revenue
          </h2>
          <p className="text-3xl font-bold text-gray-800">${totalRevenue}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-between">
        <ResponsiveContainer width="80%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <SuccessStories />
      </div>
    </div>
  );
};

export default AdminDashboard;
