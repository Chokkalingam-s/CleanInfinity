import { useState } from 'react'

const MultiStepForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    otp: '',
    address: '',
    state: '',
    district: '',
    ward: '',
  })

  const states = ['State 1', 'State 2', 'State 3'] // Replace with actual states
  const districts = ['District 1', 'District 2', 'District 3'] // Replace with actual districts
  const wards = ['Ward 1', 'Ward 2', 'Ward 3'] // Replace with actual wards

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const nextStep = (e) => {
    e.preventDefault()
    if (step < 3) setStep(step + 1)
  }

  const prevStep = (e) => {
    e.preventDefault()
    if (step > 1) setStep(step - 1)
  }

  return (
    <div>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <form onSubmit={nextStep}>
          <div className='border-b mb-5 pb-4'>
            <ul className='flex space-x-10'>
              <li
                className={`flex items-center space-x-2 ${
                  step === 1 ? 'text-indigo-700' : 'text-gray-500'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-full ${
                    step === 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  1
                </span>
                <span>Details</span>
              </li>
              <li
                className={`flex items-center space-x-2 ${
                  step === 2 ? 'text-indigo-700' : 'text-gray-500'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-full ${
                    step === 2 ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  2
                </span>
                <span>Address</span>
              </li>
              <li
                className={`flex items-center space-x-2 ${
                  step === 3 ? 'text-indigo-700' : 'text-gray-500'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-full ${
                    step === 3 ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  3
                </span>
                <span>Confirmation</span>
              </li>
            </ul>
          </div>

          {step === 1 && (
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
              <div className='flex items-center justify-center gap-x-2 mb-2'>
                <input
                  type='number'
                  name='otp'
                  placeholder='Enter OTP'
                  value={formData.otp}
                  onChange={handleChange}
                  min='0'
                  className='w-full mb-0'
                  onFocus={(e) => e.target.select()}
                />
                <button
                  type='button'
                  className='w-full bg-medium-green rounded-lg p-2 shadow-lg hover:bg-transparent hover:border-2 border-medium-green hover:text-dark-green font-bold hover:shadow-sm'
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
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
                  <option value=''>Select State</option>
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
                  <option value=''>Select District</option>
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
                <option value=''>Select Ward</option>
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

          {step === 3 && (
            <div className='space-y-4'>
              <p className='text-gray-700'>Please review your information:</p>
              <p>Name: {formData.name}</p>
              <p>Mobile No: {formData.mobile}</p>
              <p>Email: {formData.email}</p>
              <p>Address: {formData.address}</p>
              <p>State: {formData.state}</p>
              <p>District: {formData.district}</p>
              <p>Ward: {formData.ward}</p>
            </div>
          )}

          <div className='flex justify-between mt-6'>
            {step > 1 && (
              <button
                type='button'
                className='bg-white border border-gray-300 text-gray-700 rounded-md p-2'
                onClick={prevStep}
              >
                Back
              </button>
            )}
            <button
              type='submit'
              className='bg-medium-green text-white rounded-md p-2'
            >
              {step === 3 ? 'Submit' : 'Next Step'}
              {step < 3 && (
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='inline-block ml-2'
                >
                  <path
                    d='M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z'
                    fill='white'
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default MultiStepForm
