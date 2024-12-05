import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config';

export default function Inbox() {
  const [cards, setCards] = useState([]);
  const [modalImage, setModalImage] = useState();
  const [completedCards, setCompletedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${config.backendUrl}pingme`, {
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

  const handleViewImages = (images) => {
    setModalImage(images); // Store all images
  };

  const handleMarkAsDone = (id) => {
    setCompletedCards((prev) => [...prev, id]);
  };

  return (
    <div className="container flex flex-col gap-4">
      <h2>Inbox</h2>
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
            onClick={() =>
              handleViewImages(card.images ? JSON.parse(card.images) : [])}
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Render multiple images */}
            <div className="flex flex-wrap justify-center gap-4">
              {modalImage.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendUrl}${image}`}
                  alt={`Modal View ${index + 1}`}
                  className="max-w-[40%] max-h-[40vh] object-contain" // Adjusted size
                />
              ))}
            </div>
            {/* Close Button */}
            <button
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 mx-auto block"
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
