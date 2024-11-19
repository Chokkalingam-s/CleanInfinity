import {useState} from "react"

const data = [
  {
    id: 1,
    name: "John Doe",
    state: "Tamil Nadu",
    district: "Chennai",
    title: "Card Title 1",
    description: "This is the description for card 1.",
    image: "https://placehold.co/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    state: "Tamil Nadu",
    district: "Chennai",
    title: "Card Title 2",
    description: "This is the description for card 2.",
    image: "https://placehold.co/150",
  },
]

export default function Inbox() {
  const [modalImage, setModalImage] = useState(null)
  const [completedCards, setCompletedCards] = useState([])

  const handleViewImage = image => {
    setModalImage(image)
  }

  const handleMarkAsDone = id => {
    setCompletedCards(prev => [...prev, id])
  }

  return (
    <div className='container flex flex-col gap-y-4 justify-center'>
      {data.map(card => (
        <div
          key={card.id}
          className={`flex items-center p-4 rounded-lg shadow-md cards ${
            completedCards.includes(card.id)
              ? "bg-light-green"
              : "bg-white/40 backdrop-blur-md"
          }`}>
          <span>
            <h3 className='font-bold text-lg'>{card.name}</h3>
            <p>
              {card.state}, {card.district}
            </p>
          </span>
          <span>
            <h4 className='font-bold'>{card.title}</h4>
            <p>{card.description}</p>
          </span>
          <button
            className='px-4 py-2 rounded-lg shadow-lg bg-lightest-green ml-4'
            onClick={() => handleViewImage(card.image)}>
            View Images
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white shadow-lg rounded-lg ml-4 hover:bg-red-600'
            onClick={() => handleMarkAsDone(card.id)}>
            Mark as Done
          </button>
        </div>
      ))}

      {/* Modal */}
      {modalImage && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg shadow-lg'>
            <img
              src={modalImage}
              alt='Modal View'
              className='max-w-full h-auto'
            />
            <button
              className='mt-2 px-4 float-end py-2 bg-red-500 text-white rounded hover:bg-red-600'
              onClick={() => setModalImage(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
