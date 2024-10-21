import { useState } from 'react'

export default function AuthComponent() {
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
    otp: '', // Added OTP to state
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const InputField = ({
    type,
    name,
    placeholder,
    required = true,
    className = '',
    ...props
  }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
      required={required}
      className={`w-full ${className}`} // Add className here
      {...props}
    />
  )

  const SelectField = ({ name, options, className = '' }) => (
    <select
      name={name}
      value={formData[name]}
      onChange={handleChange}
      className={`w-full ${className}`} // Add className here
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  )

  const states = ['State 1', 'State 2']
  const districts = ['District 1', 'District 2']
  const wards = ['Ward 1', 'Ward 2']

  return (
    <div
      aria-label='for creating a full page view'
      className='min-h-screen flex items-center justify-center bg-lightest-green'
    >
      <div className='w-1/3 bg-light-green p-6 rounded-lg shadow-2xl'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(formData)
          }}
        >
          {!isSignUp ? (
            <>
              <InputField
                type='text'
                name='mobile'
                placeholder='Mobile No'
                className='w-full'
              />
              <InputField
                type='email'
                name='email'
                placeholder='Mail Id'
              />
              <div className='flex items-center'>
                <input
                  type='text'
                  value='ABC123'
                  readOnly
                  className='w-2/3 bg-gray-200'
                />
                <InputField
                  type='text'
                  name='captchaInput'
                  placeholder='Enter Captcha'
                  className='w-1/3'
                />
              </div>
              <InputField
                type='password'
                name='password'
                placeholder='Password'
              />
            </>
          ) : (
            <>
              <InputField
                type='text'
                name='name'
                placeholder='Name'
              />
              <InputField
                type='text'
                name='mobile'
                placeholder='Mobile No'
              />
              <InputField
                type='email'
                name='email'
                placeholder='Mail Id'
              />
              <div className='flex items-center'>
                <InputField
                  type='number' // Changed to number type
                  name='otp'
                  placeholder='Enter OTP'
                  className='w-10/12'
                  min='0' // Optional: Set min to 0 for number input
                  onFocus={(e) => e.target.select()} // Select the content on focus
                />
                <button
                  type='button'
                  className='ml-2'
                >
                  Verify OTP
                </button>
              </div>
              <InputField
                type='text'
                name='address'
                placeholder='Address'
              />
              <div className='flex'>
                <SelectField
                  name='state'
                  options={states}
                />
                <SelectField
                  name='district'
                  options={districts}
                />
              </div>
              <SelectField
                name='ward'
                options={wards}
              />
            </>
          )}
          <button type='submit'>Submit</button>
          <div className='w-full group authBtn border-2 border-medium-green rounded-lg mt-4 font-bold'>
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
        </form>
      </div>
    </div>
  )
}
