import {useState, useEffect} from 'react'

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
    mappedTvmobileNumber: ['12345', '12345', '12345'],
    nfcDid: '',
    credits: '',
    nfcDPoints: '',
    photo: null
  })

  useEffect(() => {
    setProfile(prevProfile => ({
      ...prevProfile,
      id: Math.floor(Math.random() * 1000),
      credits: Math.floor(Math.random() * 1000)
    }))
  }, [])

  return (
    <div className='flex items-center justify-center container min-h-screen'>
      <div className='drop p-4 lg:w-7/12 md:w-1/2'>
        <h2 className='font-semibold text-xl mb-2 text-start'>Profile</h2>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-2 items-center'>
          <div className='col-span-2 md:col-span-1 flex justify-center'>
            <img
              src={profile.photo || 'https://placehold.co/150'}
              alt='Profile'
              className='w-1/2 md:w-10/12 lg:w-10/12 rounded-lg shadow-lg'
            />
          </div>
          <input id='photo-upload' type='file' accept='image/*' className='hidden' />
          <span className='col-span-2 md:col-span-1'>
            <input type='text' name='name' value={profile.name} placeholder='Name' disabled />
            <input type='text' name='mobileNumber' value={profile.mobileNumber} placeholder='Mobile Number' disabled />
            <input type='email' name='mailId' value={profile.mailId} placeholder='Mail ID' disabled />
          </span>
          <input
            type='text'
            name='address'
            value={profile.address}
            placeholder='Address'
            disabled
            className='col-span-2'
          />
          <span className='flex gap-2 col-span-2'>
            <input type='text' name='state' value={profile.state} placeholder='State' disabled />
            <input type='text' name='district' value={profile.district} placeholder='District' disabled />
          </span>
          <input type='text' name='ward' value={profile.ward} placeholder='Ward' disabled className='col-span-2' />
          <input
            type='text'
            name='nfcDid'
            value={profile.nfcDid}
            placeholder='NFC ID'
            disabled
            className='col-span-2'
          />

          <div className='flex flex-col md:flex-row gap-2 md:gap-4 col-span-2'>
            <input
              type='text'
              name='nfcDPoints'
              value={profile.nfcDPoints}
              placeholder='NFC Points'
              disabled
              className='flex-1 col-span-2'
            />
            <div type='button' className='btn text-center flex-1' disabled>
              🏅 Credits: {profile.credits}
            </div>
          </div>
          <div className='col-span-2 text-center'>
            <p className='mb-2'>Mapped TV Mobile Number</p>
            <div className='flex gap-2 justify-center'>
              {profile.mappedTvmobileNumber.map(number => (
                <span key={number} className='drop px-2 py-1 text-sm'>
                  {number}
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
