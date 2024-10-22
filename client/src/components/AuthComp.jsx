import { useState } from 'react'
import { toast } from 'react-toastify'

export default function AuthComponent({ states, wards }) {
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
  const [otpVerified, setOtpVerified] = useState(false)
  const [districtsArr, setDistricts] = useState([states.states[0].districts])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === 'state') {
      const selectedState = states.states.find(
        (stateObj) => stateObj.state === value
      )
      if (selectedState) setDistricts(selectedState.districts)
      else setDistricts([])
    }
  }

  const sendOtp = () => {
    setOtpSent(true)
    toast.success('OTP sent successfully!')
  }

  const verifyOtp = () => {
    setOtpVerified(true)
    toast.success('OTP verified successfully!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otpVerified || isSignUp) {
      window.location.href = '/dashboard'
    }
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
        <form onSubmit={handleSubmit}>
          <div className='w-full group authBtn border-2 border-medium-green rounded-lg font-bold mb-4'>
            <button
              type='button'
              className={`animate ${!isSignUp ? 'activeBtn' : 'notActiveBtn'}`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign Up
            </button>
            <button
              type='button'
              className={`animate ${isSignUp ? 'activeBtn' : 'notActiveBtn'}`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign In
            </button>
          </div>

          {!isSignUp ? (
            <>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className='w-full'
              />
              <div className='flex items-center'>
                <input
                  type='text'
                  name='mobile'
                  placeholder='Mobile Number'
                  value={formData.mobile}
                  onChange={handleChange}
                  className='w-full'
                />
                <button
                  type='button'
                  onClick={sendOtp}
                  className='w-full ml-2 bg-medium-green rounded-lg p-2 text-white font-bold mb-4'
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
                    className='w-full'
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

              {otpVerified && (
                <>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full'
                  />
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                    className='w-full'
                  />
                  <div className='flex'>
                    <select
                      name='state'
                      value={formData.state}
                      onChange={handleChange}
                      className='w-1/2 mr-2'
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
                      className='w-1/2'
                    >
                      {districtsArr.map((district, index) => (
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
                    className='w-full'
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
                type='text'
                name='mobile'
                placeholder='Mobile No'
                value={formData.mobile}
                onChange={handleChange}
                className='w-full'
              />
              <input
                type='email'
                name='email'
                placeholder='Mail Id'
                value={formData.email}
                onChange={handleChange}
                className='w-full'
              />
              <div className='flex items-center'>
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
                  className='ml-2'
                />
              </div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='w-full'
              />
            </>
          )}
          <button
            type='submit'
            disabled={!otpVerified && !isSignUp}
            className={`w-full ${
              otpVerified || isSignUp
                ? 'bg-medium-green hover:bg-transparent hover:border-2 hover:text-dark-green hover:shadow-sm shadow-lg'
                : 'bg-dark-green'
            } rounded-lg p-2 border-medium-green font-bold mt-4`}
          >
            {!isSignUp ? 'Get Started' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
