import { useState } from 'react'

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
            <button
              type='button'
              className={`animate ${isSignUp ? 'activeBtn' : 'notActiveBtn'}`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {!isSignUp ? 'Sign in' : 'Sign up'}
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
                className='w-full bg-medium-green rounded-lg p-2 shadow-lg hover:bg-transparent hover:border-2 border-medium-green hover:text-dark-green font-bold hover:shadow-sm mb-4'
              >
                Verify OTP
              </button>
            </>
          )}
          <button
            type='submit'
            onClick={() => {
              console.log(formData)
              window.location.href = '/dashboard'
            }}
            className='w-full bg-medium-green rounded-lg p-2 shadow-lg hover:bg-transparent hover:border-2 border-medium-green hover:text-dark-green font-bold hover:shadow-sm mt-4'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
