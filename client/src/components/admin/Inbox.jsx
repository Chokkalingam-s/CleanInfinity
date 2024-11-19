import {useState} from "react"

const data = [
  {
    id: 1,
    name: "John Doe",
    state: "California",
    district: "Los Angeles",
    title: "Card Title 1",
    description: "This is the description for card 1.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    state: "Texas",
    district: "Houston",
    title: "Card Title 2",
    description: "This is the description for card 2.",
    image: "https://placeholder.com/150",
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
    <div className='container flex flex-col gap-4'>
      {data.map(card => (
        <div
          key={card.id}
          className={`flex items-center p-4 rounded-lg shadow-md ${
            completedCards.includes(card.id) ? "bg-green-100" : "bg-white"
          }`}>
          <div className='flex-1'>
            <h3 className='font-bold text-lg'>{card.name}</h3>
            <p>
              {card.state}, {card.district}
            </p>
          </div>
          <div className='w-px h-full bg-gray-300 mx-4'></div>
          <div className='flex-1'>
            <h4 className='font-bold'>{card.title}</h4>
            <p>{card.description}</p>
          </div>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => handleViewImage(card.image)}>
            View Images
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2'
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
              className='mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
              onClick={() => setModalImage(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
