import { useState, useEffect } from "react";
import Leaderboard from "../common/Leaderboard";

const decodeJWT = token => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
export default function StateProgress() {
  const [stateName, setStateName] = useState(""); // Admin's state
  const [leaderboardData, setLeaderboardData] = useState([]); // Leaderboard data
  const [wardRank, setWardRank] = useState(null); // Ranking of the ward in the state

  useEffect(() => {
    const token = localStorage.getItem("adminAuthToken");
    if (token) {
      const decoded = decodeJWT(token);
      if (!decoded) return;

      const { state: decodedState, district: decodedDistrict, ward: decodedWard } = decoded;

      setStateName(decodedState);
      fetch(`http://localhost:5000/api/state-progress?state=${decodedState}`)
      .then(res => res.json())
      .then(data => {
        setLeaderboardData(data.leaderboard || []);

        // Determine the rank of the current ward
        const wardIndex = data.leaderboard.findIndex(entry =>
          entry.name.includes(`${decodedDistrict}-${decodedWard}`)
        );
        setWardRank(wardIndex !== -1 ? wardIndex + 1 : null);
      })
      .catch(err => console.error("Error fetching state progress data:", err));
  } else {
    console.error("No token found!");
  }
}, []);

  const getOrdinalSuffix = rank => {
    const j = rank % 10,
      k = rank % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="w-11/12 drop px-6 py-4">
        <h2 className="mb-4 text-xl font-semibold">State Progress</h2>
        <div className="drop p-6 mb-4">
          <div className="text-lg font-medium text-center">
            <h3 className="block text-4xl font-bold">
              {wardRank}
              {getOrdinalSuffix(wardRank)}
            </h3>
            <span className="block mt-2 text-light">
              Ranking Of Your Ward In Your State ~ {stateName}
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="overflow-y-auto max-h-96 rounded-lg pb-6">
            <Leaderboard
              leaderboardData={leaderboardData}
              wardRank={wardRank}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-medium-green/20 to-transparent h-6 backdrop-blur-md "></div>
        </div>
      </div>
    </div>
  );
}
