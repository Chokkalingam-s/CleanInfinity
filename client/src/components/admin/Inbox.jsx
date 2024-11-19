import { useState, useEffect } from "react";
import axios from "axios";

export default function Inbox() {
  const [cards, setCards] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [completedCards, setCompletedCards] = useState([]);

  // Fetch PingMe data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/pingme", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching PingMe data:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewImage = (image) => {
    setModalImage(image);
  };

  const handleMarkAsDone = (id) => {
    setCompletedCards((prev) => [...prev, id]);
  };

  return (
    <div className="container flex flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`flex items-center p-4 rounded-lg shadow-md ${
            completedCards.includes(card.id) ? "bg-green-100" : "bg-white"
          }`}
        >
          <div className="flex-1">
            <h3 className="font-bold text-lg">{card.name}</h3>
            <p>
              {card.state}, {card.district}, {card.ward}
            </p>
          </div>
          <div className="w-px h-full bg-gray-300 mx-4"></div>
          <div className="flex-1">
            <h4 className="font-bold">{card.subject}</h4>
            <p>{card.description}</p>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleViewImage(card.images ? JSON.parse(card.images)[0] : null)}
          >
            View Images
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            onClick={() => handleMarkAsDone(card.id)}
          >
            Mark as Done
          </button>
        </div>
      ))}

      {/* Modal for image preview */}
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={`http://localhost:5000/${modalImage}`}
              alt="Modal View"
              className="max-w-full h-auto"
            />
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setModalImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
