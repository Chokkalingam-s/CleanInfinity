import { useEffect, useState } from "react";
import axios from "axios";
import BarGraph from "./BarChart";
import VerticalCard from "./VerticalCard";
import NotificationPop from "../common/NotificationPop";

export default function Dashboard({ BarGraphVals, titles }) {
  const [username, setUsername] = useState("");
  const [credits, setCredits] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(true);
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsername(response.data.name);
        setCredits(response.data.credits);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {showNotification && (
        <NotificationPop
          title="Fake Notification"
          description="Filled with the latest notification"
          onClose={() => setShowNotification(false)}
        />
      )}
      <h2 className="my-2">Hi, {username}!</h2>
      <div className="w-24 flex items-center justify-around p-2 drop absolute top-15 right-2 z-10">
        <img src="/coins-solid.svg" className="w-6" alt="Credit Icon" />
        <p className="font-bold">{credits}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-y-6 mt-12 md:mt-0 lg:mt-0">
        <BarGraph data={BarGraphVals} />
        <h3 className="text-2xl font-bold">How to use?</h3>
        <VerticalCard titles={titles} />
      </div>
    </div>
  );
}
