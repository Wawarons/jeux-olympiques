import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { getTickets } from "./utils/apiService";
import Tickets from "./components/dashboard/Tickets";
import Bundles from "./components/dashboard/Bundles";
import Command from "./components/dashboard/Command";
import User from "./components/dashboard/User";
/**
 * Dashboard component displays the main dashboard layout with navigation bar and ticket information.
 * It fetches tickets data on component mount using useEffect hook.
 * 
 * @returns JSX.Element
 */
const Dashboard = () => {

  const [index, setIndex] = useState<number>(0);
  const reactElements = [<Tickets/>, <Bundles />, <Command />, <User/>]

  useEffect(() => {
    getTickets();
  })


  return (
    <>
      <NavBar />
      <h1 className="w-fit mx-auto mt-10  mb-20 text-4xl">Dashboard</h1>
      <div className="md:w-3/4 w-[95%] mx-auto flex justify-between items-center align-middle my-5 shadow-border rounded-md">
        <p onClick={() => setIndex(0)} className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 w-full text-center p-2">
          Ticket
        </p>
        <p onClick={() => setIndex(1)} className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 border-l-2 border-gray-200 w-full text-center p-2">
          Bundle
        </p>
        <p onClick={() => setIndex(2)} className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 border-l-2 border-gray-200 w-full text-center p-2">
          Sales
        </p>
        <p onClick={() => setIndex(3)} className="text-lg cursor-pointer transition divide-purple-200 font-semibold hover:text-blue-500 border-l-2 border-gray-200 w-full text-center p-2">
          Users
        </p>
      </div>
      {reactElements[index]}
    </>
  );
};

export default Dashboard;
