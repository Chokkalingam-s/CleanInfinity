import {useState, useEffect} from "react"
import axios from "axios"
import BarChart from "./BarChart"
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const UserProgress = ({name, value, barStyles}) => (
  <div className='flex flex-col items-center'>
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      styles={{
        ...barStyles,
        trail: {
          stroke: "#50b498",
        },
      }}
    />
    <p className='mt-2 font-bold'>{name}</p>
  </div>
)

const UserProgressGrid = ({users, progressBarStyles}) => (
  <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
    {users.map(user => (
      <UserProgress
        key={user.name}
        name={user.name}
        value={user.value}
        barStyles={progressBarStyles}
      />
    ))}
  </div>
)

export default function Progress({data, users, progressBarStyles}) {
  const [nfcData, setNfcData] = useState({
    nfcDId: "",
    nfcNDId: "",
    nfcDPoints: "",
    nfcNDPoints: "",
    credits: "",
  })

  useEffect(() => {
    const fetchNfcData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setNfcData({
          nfcDId: response.data.nfcDId,
          nfcNDId: response.data.nfcNDId,
          nfcDPoints: response.data.nfcDPoints,
          nfcNDPoints: response.data.nfcNDPoints,
          credits: response.data.credits,
        })
      } catch (error) {
        console.error("Error fetching NFC data:", error)
      }
    }

    fetchNfcData()
  }, [])

  return (
    <div className='container'>
      <div className='flex flex-col md:flex-row gap-y-4 items-center justify-center'>
        <div className='w-11/12 md:w-96 mt-8 mx-auto'>
          <div className='flex space-x-4 mb-4'>
            <div className='w-1/2'>
              <label htmlFor='nfcDId' className='block text-sm font-semibold'>
                NFC Degradable Id
              </label>
              <input
                id='nfcDId'
                type='text'
                placeholder='nfcDId'
                value={nfcData.nfcDId}
                disabled
                className='w-full p-2 border rounded mt-1'
              />
            </div>
            <div className='w-1/2'>
              <label htmlFor='nfcNDId' className='block text-sm font-semibold'>
                Non-Degradable Id
              </label>
              <input
                id='nfcNDId'
                type='text'
                placeholder='nfcNDId'
                value={nfcData.nfcNDId}
                disabled
                className='w-full p-2 border rounded mt-1'
              />
            </div>
          </div>

          <div className='flex space-x-4 mb-4'>
            <div className='w-1/2'>
              <label
                htmlFor='nfcDPoints'
                className='block text-sm font-semibold'>
                Degradable Score
              </label>
              <input
                id='nfcDPoints'
                type='text'
                placeholder='nfcDPoints'
                value={nfcData.nfcDPoints}
                disabled
                className='w-full p-2 border rounded mt-1'
              />
            </div>
            <div className='w-1/2'>
              <label
                htmlFor='nfcNDPoints'
                className='block text-sm font-semibold'>
                Non-Degradable Score
              </label>
              <input
                id='nfcNDPoints'
                type='text'
                placeholder='nfcNDPoints'
                value={nfcData.nfcNDPoints}
                disabled
                className='w-full p-2 border rounded mt-1'
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4 col-span-2'>
            <div type='button' className='btn text-center flex-1' disabled>
              🏅 Overall Credits : {nfcData.credits}
            </div>
          </div>
        </div>
      </div>
      <h2 className='text-xl md:text-2xl font-bold px-5 mb-4'>Leaderboard</h2>
      <UserProgressGrid users={users} progressBarStyles={progressBarStyles} />
      <div className='px-5 flex justify-center'>
        <BarChart data={data} />
      </div>
    </div>
  )
}
