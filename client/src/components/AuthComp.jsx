import { useState, useEffect } from 'react' 
import { toast } from 'react-toastify';
import axios from 'axios';

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
  const [districtsArr, setDistricts] = useState(states.states[0].districts);
  const [captcha, setCaptcha] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCaptcha = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    setCaptcha(randomCaptcha);
  };

  const verifyCaptcha = () => {
    if (formData.captchaInput === captcha) {
      setCaptchaVerified(true);
      toast.success('Captcha verified successfully!');
    } else {
      toast.error('Captcha is incorrect, please try again.');
      setCaptchaVerified(false);
      generateCaptcha();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'state') {
      const selectedState = states.states.find(
        (stateObj) => stateObj.state === value
      );
      if (selectedState) {
        setDistricts(selectedState.districts);
      } else {
        setDistricts([]);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Sign Up Logic
        const response = await axios.post('http://localhost:5000/signup', {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          address: formData.address,
          state: formData.state,
          district: formData.district,
          ward: formData.ward,
          password: formData.password,
        });

        toast.success(response.data || 'User registered successfully');
        // Reset form after signup
        setFormData({
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
      } else {
        // Sign In Logic
        const response = await axios.post('http://localhost:5000/signin', {
          mobile: formData.mobile,
          password: formData.password,
        });

        toast.success(response.data || 'User logged in successfully');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error('An error occurred during authentication');
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-sm p-8 bg-light-green rounded-xl shadow-lg'>
        <div className='mb-6 w-full slider-btn border-2 border-medium-green rounded-xl shadow-lg flex overflow-hidden'>
          <button
            type='button'
            className={`transition-colors duration-300
              ${!isSignUp ? 'notActiveBtn' : 'activeBtn'}`}
            onClick={() => setIsSignUp(false)}
          >
            <p>Sign In</p>
            <p>(Existing User)</p>
          </button>
          <button
            type='button'
            className={`transition-colors duration-300 
              ${isSignUp ? 'notActiveBtn' : 'activeBtn'}`}
            onClick={() => setIsSignUp(true)}
          >
            <p>Sign Up</p>
            <p>(New User!)</p>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className='input-field'
              />
              <div className='flex mb-4 gap-x-2'>
                <input
                  type='number'
                  name='mobile'
                  placeholder='Mobile Number'
                  value={formData.mobile}
                  onChange={handleChange}
                  className='input-field'
                />
                <button
                  type='button'
                  onClick={sendOtp}
                  className='bg-medium-green text-white hover:bg-green-400 button-common'
                >
                  Send OTP
                </button>
              </div>

              {otpSent && !otpVerified && (
                <>
                  <input
                    type='number'
                    name='otp'
                    placeholder='Enter OTP'
                    value={formData.otp}
                    onChange={handleChange}
                    className='input-field'
                  />
                  <button
                    type='button'
                    onClick={verifyOtp}
                    className='button-common bg-medium-green text-white hover:bg-green-400'
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {otpVerified && (
                <>
                 <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='input-field'
              />
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='input-field'
                  />
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                    className='input-field'
                  />
                  <div className='flex mb-4 gap-x-2'>
                    <select
                      name='state'
                      value={formData.state}
                      onChange={handleChange}
                      className='w-1/2 input-field'
                    >
                      {states.states.map((stateObj, index) => (
                        <option
                          key={index}
                          value={stateObj.state}
                        >
                          {stateObj.state}
                        </option>
                      ))}
                    </select>
                    <select
                      name='district'
                      value={formData.district}
                      onChange={handleChange}
                      className='w-1/2 input-field'
                    >
                      {districtsArr.map((district, index) => (
                        <option
                          key={`${index}`}
                          value={district}
                        >
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name='ward'
                    value={formData.ward}
                    onChange={handleChange}
                    className='input-field'
                  >
                    {wards.map((ward, index) => (
                      <option
                        key={index}
                        value={ward}
                      >
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
                type='number'
                name='mobile'
                placeholder='Mobile No'
                value={formData.mobile}
                onChange={handleChange}
                className='input-field'
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='input-field'
              />

              <div className='flex items-center gap-x-2'>
                <input
                  type='text'
                  value={captcha}
                  readOnly
                  className='w-1/2 py-2 mt-2 rounded-lg border text-xs text-center'
                />
                <input
                  type='text'
                  name='captchaInput'
                  placeholder='Enter Captcha'
                  value={formData.captchaInput}
                  onChange={handleChange}
                  className='w-1/2 input-field text-sm'
                />
                <button
                  type='button'
                  className='button-common bg-medium-green text-sm'
                  onClick={verifyCaptcha}
                >
                  Verify Captcha
                </button>
              </div>
            </>
          )}
          <button
            type='submit'
            disabled={
              (isSignUp && !otpVerified) || (!isSignUp && !captchaVerified)
            }
            className={`button-common mt-4 ${
              (isSignUp && otpVerified) || (!isSignUp && captchaVerified)
                ? 'bg-green-hover'
                : 'button-disabled'
            }`}
          >
            {!isSignUp ? 'Log In' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}
