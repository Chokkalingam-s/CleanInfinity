import { useEffect, useState } from "react";
import axios from "axios";
import BarGraph from "./BarChart";
import VerticalCard from "./VerticalCard";
import NotificationPop from "../common/NotificationPop";
import config from '../../config';
export default function Dashboard({ BarGraphVals, titles }) {
  const [username, setUsername] = useState("");
  const [credits, setCredits] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [latestNotification, setLatestNotification] = useState({ title: "", description: "" });

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}get-profile`, {
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

    const fetchLatestNotification = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}api/latest-notification`);
        if (response.data) {
          setLatestNotification({
            title: response.data.title,
            description: response.data.message, 
          });
          console.log("Latest notification:", response.data);
        }
      } catch (error) {
        console.error("Error fetching latest notification:", error);
      }
    };

    setShowNotification(true);
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    fetchUserData();
    fetchLatestNotification();

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="container">
      {showNotification && (
        <NotificationPop
        title={latestNotification.title}
        description={latestNotification.description}
          onClose={() => setShowNotification(false)}
        />
      )}
      <span className="flex justify-between items-center">
        <h2>Hi, {username}!</h2>
        <div className="w-24 flex items-center justify-around p-2 drop">
          <img src="/coins-solid.svg" className="w-6" alt="Credit Icon" />
          <p className="font-bold">{credits}</p>
        </div>
      </span>
      <div className="flex flex-col items-center justify-center w-full gap-y-6 mt-4 md:mt-0 lg:mt-0">
        <BarGraph data={BarGraphVals} />
        <h3 className="text-2xl font-bold">How to use?</h3>
        <VerticalCard titles={titles} />
      </div>
    </div>
  );
}
