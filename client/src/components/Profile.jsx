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
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='bg-light-green p-4 shadow-lg rounded-lg font-medium'>
        <h2 className='font-semibold text-dark-green mb-6 text-start'>
          Profile
        </h2>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                <span className='text-green-700'>Upload Photo</span>
              </div>
            )}
            <input
              id='photo-upload'
              type='file'
              accept='image/*'
              className='hidden'
            />
          </label>

          <input
            type='text'
            name='id'
            value={profile.id}
            placeholder='ID'
            className='input-field'
            disabled
          />

          <input
            type='text'
            name='name'
            value={profile.name}
            placeholder='Name'
            className='input-field'
            disabled
          />

          <input
            type='text'
            name='mobileNumber'
            value={profile.mobileNumber}
            placeholder='Mobile Number'
            className='input-field'
            disabled
          />

          <input
            type='email'
            name='mailId'
            value={profile.mailId}
            placeholder='Mail ID'
            className='input-field'
            disabled
          />

          <input
            type='text'
            name='address'
            value={profile.address}
            placeholder='Address'
            className='input-field'
            disabled
          />

          <input
            type='text'
            name='state'
            value={profile.state}
            placeholder='State'
            className='input-field'
            disabled
          />
          <input
            type='text'
            name='district'
            value={profile.district}
            placeholder='District'
            className='input-field'
            disabled
          />
          <input
            type='text'
            name='ward'
            value={profile.ward}
            placeholder='Ward'
            className='input-field'
            disabled
          />
          <input
            type='text'
            name='mappedTvmobileNumber'
            value={profile.mappedTvmobileNumber}
            placeholder='Mapped Mobile Number'
            className='input-field'
            disabled
          />
          <input
            type='text'
            name='nfcDid'
            value={profile.nfcDid}
            placeholder='NFC ID'
            className='input-field'
            disabled
          />
          <input
            type='text'
            name='nfcDPoints'
            value={profile.nfcDPoints}
            placeholder='NFC Points'
            className='input-field'
            disabled
          />
          <button
            type='button'
            className='button-common bg-medium-green text-lightest-green'
            disabled
          >
            🏅 Credits: {profile.credits}
          </button>
        </form>
      </div>
    </div>
  )
}
