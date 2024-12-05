import { useEffect, useState } from "react";
import Leaderboard from "../common/Leaderboard";
import config from '../../config';

export default function AdminDashboard() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalUsersInWard, setTotalUsersInWard] = useState(0);
  const [wardRank, setWardRank] = useState(null);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminAuthToken");

    if (token) {
      const decoded = decodeJWT(token);
      if (!decoded) return;

      const {
        state: decodedState,
        district: decodedDistrict,
        ward: decodedWard,
      } = decoded;

      setState(decodedState);
      setDistrict(decodedDistrict);
      setWard(decodedWard);
      fetch(
        `${config.backendUrl}api/leaderboard?state=${decodedState}&district=${decodedDistrict}&ward=${decodedWard}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setLeaderboard(data.leaderboard || []);
          setTotalUsersInWard(data.totalUsers || 0);

          const wardIndex = data.leaderboard.findIndex((entry) =>
            entry.ward === decodedWard
          );
          setWardRank(wardIndex !== -1 ? wardIndex + 1 : null);
        })
        .catch((err) => console.error("Error fetching leaderboard:", err));
    } else {
      console.error("No token found!");
    }
  }, []);
  return (
    <div className="container flex items-center justify-center">
      <div className="w-4/5 drop px-6 py-4">
        <div className="w-10/12 mx-auto">
          <h2 className="my-2">Welcome Admin!</h2>
          <div className="mx-auto drop p-6 my-4">
            <h3 className="mb-4">Details of Ward</h3>
            <div className="grid grid-cols-3 gap-4">
              {state && district && ward
                ? (
                  <>
                    <p className="text-sm bg-light-green rounded-md p-2 text-center shadow-sm">
                      State: {state}
                    </p>
                    <p className="text-sm bg-light-green rounded-md p-2 text-center shadow-sm">
                      District: {district}
                    </p>
                    <p className="text-sm bg-light-green rounded-md p-2 text-center shadow-sm">
                      Ward: {ward}
                    </p>
                  </>
                )
                : (
                  <p className="text-sm text-gray-500 col-span-3">
                    No ward details found.
                  </p>
                )}
            </div>
          </div>
          <div className="drop rounded-lg shadow-md p-6 my-4">
            <p className="text-lg font-medium text-center">
              <span className="block text-4xl font-bold text-light">
                {totalUsersInWard}
              </span>
              <span className="block mt-2">Total Users in Ward on Board</span>
            </p>
          </div>
          <Leaderboard leaderboardData={leaderboard} wardRank={wardRank} />
        </div>
      </div>
    </div>
  );
}
