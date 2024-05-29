import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { getTickets } from "./utils/apiService";
import Tickets from "./Tickets";
/**
 * Dashboard component displays the main dashboard layout with navigation bar and ticket information.
 * It fetches tickets data on component mount using useEffect hook.
 * 
 * @returns JSX.Element
 */
const Dashboard = () => {

  useEffect(() => {
    getTickets();
  })


  return (
    <>
      <NavBar />
      <div className="md:w-3/4 w-[95%] mx-auto flex justify-between items-center align-middle my-5 shadow-border rounded-md">
        <p className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 w-full text-center p-2">
          Ticket
        </p>
        <p className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 border-l-2 border-gray-200 w-full text-center p-2">
          Bundle
        </p>
        <p className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 border-l-2 border-gray-200 w-full text-center p-2">
          User
        </p>
        <p className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 border-l-2 border-gray-200 w-full text-center p-2">
          Command
        </p>
      </div>
      <Tickets />
    </>
  );
};

export default Dashboard;
