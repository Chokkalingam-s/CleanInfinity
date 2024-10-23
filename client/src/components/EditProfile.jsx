import  { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    age: '',
    photo: 'https://via.placeholder.com/150', 
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful submission (replace this with your actual logic)
    const isSuccess = true; // Change this based on your logic
    if (isSuccess) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile!');
    }
    console.log('Updated User Data:', userData);
  };

  const handleProfileClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the circle is clicked
  };

  return (
    <div className="flex flex-col items-center p-6 bg-lightest-green min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex flex-col items-center mb-4">
          <img
            src={userData.photo}
            alt="Profile"
            onClick={handleProfileClick}
            className="w-25 h-25 rounded-full border-2 p-1 border-green-500 mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden" // Hide the input
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
