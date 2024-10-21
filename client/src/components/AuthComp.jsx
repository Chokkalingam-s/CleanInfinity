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
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const InputField = ({ type, name, placeholder, required = true }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
      required={required}
      className='w-full'
    />
  )

  const SelectField = ({ name, options }) => (
    <select
      name={name}
      value={formData[name]}
      onChange={handleChange}
      className='w-full'
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
                <input
                  type='text'
                  name='captchaInput'
                  placeholder='Enter Captcha'
                  value={formData.captchaInput}
                  onFocus={(e) =>
                    e.target.setSelectionRange(
                      e.target.value.length,
                      e.target.value.length
                    )
                  }
                  onChange={handleChange}
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
              <InputField
                type='text'
                name='otp'
                placeholder='Enter OTP'
              />
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
          <div className='w-full group authBtn border-2 border-medium-green rounded-lg mt-4 font-bold'>
            <button
              className={`animate ${!isSignUp ? 'activeBtn' : 'notActiveBtn'}`}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
            <button
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
