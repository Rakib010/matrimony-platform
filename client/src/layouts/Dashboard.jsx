import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="p-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
