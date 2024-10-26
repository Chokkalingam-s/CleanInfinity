import { useState, useEffect } from 'react'
export default function ProfileForm() {
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    mobileNumber: '',
    mailId: '',
    address: '',
    state: '',
    district: '',
    ward: '',
    mappedTvmobileNumber: '',
    nfcDid: '',
    credits: '',
    nfcDPoints: '',
    photo: null,
  })
  useEffect(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      id: Math.floor(Math.random() * 1000000),
      credits: Math.floor(Math.random() * 5000),
    }))
  }, [])
  return (
    <div className='flex items-center justify-center container'>
      <div className='bg-light-green p-4 shadow-lg rounded-lg md:w-1/2'>
        <h2 className='font-semibold mb-2 text-start'>Profile</h2>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-2 items-center'>
          <label
            htmlFor='photo-upload'
            className='col-span-full md:col-span-1 cursor-pointer flex justify-center'
          >
            {profile.photo ? (
              <img
                src={profile.photo}
                alt='Profile'
                className='w-32 h-32 rounded-full object-cover shadow-md'
              />
            ) : (
              <div className='w-32 h-32 flex items-center justify-center bg-green-100 rounded-full shadow-md'>
                <span>Upload Photo</span>
              </div>
            )}
            <input
              id='photo-upload'
              type='file'
              accept='image/*'
              className='hidden'
            />
          </label>
          <span>
            <input
              type='text'
              name='name'
              value={profile.name}
              placeholder='Name'
              disabled
            />
            <input
              type='text'
              name='mobileNumber'
              value={profile.mobileNumber}
              placeholder='Mobile Number'
              disabled
            />
            <input
              type='email'
              name='mailId'
              value={profile.mailId}
              placeholder='Mail ID'
              disabled
            />
          </span>
          <input
            type='text'
            name='address'
            value={profile.address}
            placeholder='Address'
            disabled
          />
          <input
            type='text'
            name='state'
            value={profile.state}
            placeholder='State'
            disabled
          />
          <input
            type='text'
            name='district'
            value={profile.district}
            placeholder='District'
            disabled
          />
          <input
            type='text'
            name='ward'
            value={profile.ward}
            placeholder='Ward'
            disabled
          />
          <input
            type='text'
            name='mappedTvmobileNumber'
            value={profile.mappedTvmobileNumber}
            placeholder='Mapped Mobile Number'
            disabled
          />
          <input
            type='text'
            name='nfcDid'
            value={profile.nfcDid}
            placeholder='NFC ID'
            disabled
          />
          <input
            type='text'
            name='nfcDPoints'
            value={profile.nfcDPoints}
            placeholder='NFC Points'
            disabled
          />
          <span
            type='button'
            className='btn text-center'
            disabled
          >
            🏅 Credits: {profile.credits}
          </span>
        </form>
      </div>
    </div>
  )
}
