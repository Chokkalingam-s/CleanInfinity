import { useState, useEffect } from 'react';
import axios from 'axios';

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
    mappedMobileNumber: '',
    nfcDId: '',
    nfcNDId: '',
    credits: '',
    nfcDPoints: '',
    nfcNDPoints: '',
    createdAt: '',
    updatedAt: '',
    photo: null
  });

  useEffect(() => {
    // Fetch user profile details from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data); // Set the fetched profile data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

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
          <label>NFC Degradable & Non-Degradable  ID's</label>
          <span className='flex gap-2 col-span-2'>
            <input
              type='text'
              name='nfcDId'
              value={profile.nfcDId}
              placeholder='NFC Degradable ID'
              disabled
            />
            <input
              type='text'
              name='nfcNDId'
              value={profile.nfcNDId}
              placeholder='NFC Non-Degradable ID'
              disabled
            />
          </span>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4 col-span-2'>
            <div type='button' className='btn text-center flex-1' disabled>
              🏅 Credits: {profile.credits}
            </div>
          </div>
          <div className='col-span-2 text-center'>
            <p className='mb-2'>Mapped Mobile Number</p>
            <div className='flex gap-2 justify-center'>
              {profile.mappedMobileNumber.split(',').map(number => (
                <span key={number} className='drop px-2 py-1 text-sm'>
                  {number}
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
