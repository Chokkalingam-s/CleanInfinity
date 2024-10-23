import { useState } from 'react';
import { toast } from 'react-toastify';


export default function AuthComponent({ states, wards }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    address: '',
    state: '',
    district: '',
    ward: '',
    captchaInput: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [districtsArr, setDistricts] = useState([states.states[0].districts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'state') {
      const selectedState = states.states.find(
        (stateObj) => stateObj.state === value
      );
      if (selectedState) setDistricts(selectedState.districts);
      else setDistricts([]);
    }
  };

  const sendOtp = () => {
    setOtpSent(true);
    toast.success('OTP sent successfully!');
  };

  const verifyOtp = () => {
    setOtpVerified(true);
    toast.success('OTP verified successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpVerified || isSignUp) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-animation">
      <div className="w-full max-w-lg p-8 bg-light-green rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`transition-colors duration-300 py-2 px-6 rounded-full text-lg font-semibold 
              ${!isSignUp ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={`transition-colors duration-300 py-2 px-6 rounded-full text-lg font-semibold ml-2 
              ${isSignUp ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isSignUp ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <div className="flex mb-4">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-2/3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-1/3 ml-2 bg-green-500 text-white rounded-lg p-3 font-semibold hover:bg-green-400 transition"
                >
                  Send OTP
                </button>
              </div>

              {otpSent && !otpVerified && (
                <>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full bg-green-500 text-white rounded-lg p-3 font-semibold hover:bg-green-400 transition"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {otpVerified && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                  <div className="flex mb-4">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-1/2 p-3 mr-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                      {states.states.map((stateObj, index) => (
                        <option key={index} value={stateObj.state}>
                          {stateObj.state}
                        </option>
                      ))}
                    </select>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                      {districtsArr.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  >
                    {wards.map((ward, index) => (
                      <option key={index} value={ward}>
                        {ward}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
               <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
             
              <div className='flex items-center'>
                <input
                  type="text"
                  value="ABC123"
                  readOnly
                  className="w-1/2 p-3 rounded-lg border border-gray-300 bg-gray-100 text-center"
                />
                <input
                  type="text"
                  name="captchaInput"
                  placeholder="Enter Captcha"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  className="w-1/2 ml-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
             
            </>
          )}
          <button
            type="submit"
            disabled={!otpVerified && !isSignUp}
            className={`w-full py-3 rounded-lg font-semibold mt-4 transition-all duration-300
              ${otpVerified || isSignUp
                ? 'bg-green-500 hover:bg-transparent border-2 border-green-500 text-white hover:text-green-500 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {!isSignUp ? 'Get Started' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
