import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const statesData = {
  states: [
    {
      state: 'Tamil Nadu',
      districts: [
        'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 
        'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 
        'Kancheepuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 
        'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 
        'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 
        'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 
        'Theni', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 
        'Vellore', 'Viluppuram', 'Virudhunagar'
      ]
    },
    // Add more states here if needed
  ]
};

const ProfileForm = () => {
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
    photo: null
  });

  const [districtsArr, setDistricts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Generate random id and credits when the component loads
    setProfile((prevProfile) => ({
      ...prevProfile,
      id: Math.floor(Math.random() * 1000000),  // Random ID
      credits: Math.floor(Math.random() * 5000),  // Random credits
    }));
  }, []);

  useEffect(() => {
    // Automatically set districts when state is selected
    if (profile.state) {
      const selectedState = statesData.states.find(
        (stateObj) => stateObj.state === profile.state
      );
      if (selectedState) {
        setDistricts(selectedState.districts);
      } else {
        setDistricts([]);
      }
    }
  }, [profile.state]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfile({
      ...profile,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic
    const newErrors = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (!profile.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!profile.mailId) newErrors.mailId = 'Mail ID is required';
    if (!profile.state) newErrors.state = 'State is required';
    if (!profile.district) newErrors.district = 'District is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Perform the submit action (e.g., send data to server)
      console.log('Profile submitted', profile);
      toast.success('Profile saved successfully!');
      setEditing(false);
    }
  };

  return (
    <div className="bg-white py-8 px-4 w-full max-w-4xl mx-auto shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">Profile</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="col-span-full md:col-span-1 flex justify-center">
          <label htmlFor="photo-upload" className="cursor-pointer">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-md" />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-green-100 rounded-full shadow-md">
                <span className="text-green-700">Upload Photo</span>
              </div>
            )}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="col-span-full md:col-span-1">
          <button
            type="button"
            className="w-full bg-green-700 text-white py-2 rounded cursor-default"
            disabled
          >
             ID: {profile.id}          </button>
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="mobileNumber"
            value={profile.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="email"
            name="mailId"
            value={profile.mailId}
            onChange={handleChange}
            placeholder="Mail ID"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
          {errors.mailId && <p className="text-red-500 text-sm">{errors.mailId}</p>}
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <select
            name="state"
            value={profile.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          >
            <option value='' disabled>Select State</option>
            {statesData.states.map((stateObj, index) => (
              <option key={index} value={stateObj.state}>
                {stateObj.state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        <div className="col-span-full md:col-span-1">
          <select
            name="district"
            value={profile.district}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          >
            <option value='' disabled>Select District</option>
            {districtsArr.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="ward"
            value={profile.ward}
            onChange={handleChange}
            placeholder="Ward"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="mappedTvmobileNumber"
            value={profile.mappedTvmobileNumber}
            onChange={handleChange}
            placeholder="Mapped Mobile Number"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="nfcDid"
            value={profile.nfcDid}
            onChange={handleChange}
            placeholder="NFC ID"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <button
            type="button"
            className="w-full bg-green-700 text-white py-2 rounded cursor-default"
            disabled
          >
            🏅 Credits: {profile.credits}
          </button>
        </div>

        <div className="col-span-full md:col-span-1">
          <input
            type="text"
            name="nfcDPoints"
            value={profile.nfcDPoints}
            onChange={handleChange}
            placeholder="NFC Points"
            className="w-full px-4 py-2 border rounded"
            disabled={!editing}
          />
        </div>

        <div className="col-span-full">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className={`w-full py-2 rounded ${editing ? 'bg-red-600' : 'bg-green-700'} text-white`}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing && (
          <div className="col-span-full">
            <button type="submit" className="w-full bg-green-700 text-white py-2 rounded">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
