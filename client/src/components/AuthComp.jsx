import { useState } from 'react'
import { toast } from 'react-toastify'

export default function AuthComponent({ states, districts, wards }) {
  const [isSignUp, setIsSignUp] = useState(false)
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
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false) // New state for OTP verification

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const sendOtp = () => {
    // Simulate sending OTP
    setOtpSent(true)
    toast.success('OTP sent successfully!')
  }

  const verifyOtp = () => {
    // Simulate OTP verification logic
    setOtpVerified(true)
    toast.success('OTP verified successfully!')
  }

  return (
    <div
      aria-label='for creating a full page view'
      className='min-h-screen flex items-center justify-center bg-lightest-green'
    >
      <div>
        <img src='https://placehold.co/600x400' />
      </div>
      <div className='w-1/3 bg-light-green p-6 rounded-lg shadow-2xl'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(formData)
          }}
        >
          <div className='w-full group authBtn border-2 border-medium-green rounded-lg font-bold mb-4'>
            <button
              type='button'
              className={`animate ${!isSignUp ? 'activeBtn' : 'notActiveBtn'}`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign In
            </button>
            <button
              type='button'
              className={`animate ${isSignUp ? 'activeBtn' : 'notActiveBtn'}`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign Up
            </button>
          </div>
          {!isSignUp ? (
            <>
              <input
                type='text'
                name='mobile'
                placeholder='Mobile No'
                value={formData.mobile}
                onChange={handleChange}
                className='w-full mb-2'
              />
              <input
                type='email'
                name='email'
                placeholder='Mail Id'
                value={formData.email}
                onChange={handleChange}
                className='w-full mb-2'
              />
              <div className='flex items-center mb-2'>
                <input
                  type='text'
                  value='ABC123'
                  readOnly
                  className='w-1/2'
                />
                <input
                  type='text'
                  name='captchaInput'
                  placeholder='Enter Captcha'
                  value={formData.captchaInput}
                  onChange={handleChange}
                  className='w-1/3 ml-2'
                />
              </div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='w-full mb-2'
              />
            </>
          ) : (
            <>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className='w-full mb-2'
              />
              <div className='flex items-center mb-2'>
                <input
                  type='text'
                  name='mobile'
                  placeholder='Mobile Number'
                  value={formData.mobile}
                  onChange={handleChange}
                  className='w-full mb-0'
                />
                <button
                  type='button'
                  onClick={sendOtp}
                  className='w-full ml-2 bg-medium-green rounded-lg p-2 text-white font-bold'
                >
                  Send OTP
                </button>
              </div>
              {otpSent && !otpVerified && (
                <>
                  <input
                    type='text'
                    name='otp'
                    placeholder='Enter OTP'
                    value={formData.otp}
                    onChange={handleChange}
                    className='w-full mb-2'
                  />
                  <button
                    type='button'
                    onClick={verifyOtp}
                    className='w-full bg-medium-green rounded-lg p-2 text-white font-bold mb-4'
                  >
                    Verify OTP
                  </button>
                </>
              )}
              {otpVerified && ( // Show these fields only after OTP is verified
                <>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full mb-2'
                  />
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                    className='w-full mb-2'
                  />
                  <div className='flex mb-2'>
                    <select
                      name='state'
                      value={formData.state}
                      onChange={handleChange}
                      className='w-1/2 mr-2'
                    >
                      {states.map((state, index) => (
                        <option
                          key={index}
                          value={state}
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                    <select
                      name='district'
                      value={formData.district}
                      onChange={handleChange}
                      className='w-1/2'
                    >
                      {districts.map((district, index) => (
                        <option
                          key={index}
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
                    className='w-full mb-2'
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
          )}
          <button
            type='submit'
            disabled={otpVerified && isSignUp}
            className={`w-full ${
              otpVerified
                ? 'bg-medium-green hover:bg-transparent hover:border-2 hover:text-dark-green hover:shadow-sm'
                : 'bg-gray-300'
            } rounded-lg p-2 shadow-lg border-medium-green font-bold mt-4`}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}
