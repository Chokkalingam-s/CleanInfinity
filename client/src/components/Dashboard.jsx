import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarGraph from "./BarChart";
import VerticalCard from "./VerticalCard";

export default function Dashboard({ BarGraphVals, titles }) {
  const [username, setUsername] = useState('');
  const [credits, setCredits] = useState(0);

  // Fetch the user data (username and credits) from the backend when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsername(response.data.name);
        setCredits(response.data.credits); // Set credits from the response
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <p>Hi, {username}!</p>
      <div className="w-24 flex items-center justify-around p-2 drop absolute top-15 right-2 z-10">
        <img src="/coins-solid.svg" className="w-6" alt="Credit Icon" />
        <p className="font-bold">{credits}</p> {/* Display dynamic credits */}
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-y-6 mt-12 md:mt-0 lg:mt-0">
        <BarGraph data={BarGraphVals} />
        <h3 className="text-2xl font-bold">How to use?</h3>
        <VerticalCard titles={titles} />
      </div>
    </div>
  );
}
