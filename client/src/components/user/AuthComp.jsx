import {useState, useEffect} from "react"
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Seperator from "../common/seperator"

export default function AuthComponent({states, wards}) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
    address: "",
    state: "",
    district: "",
    ward: "",
    captchaInput: "",
    otp: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [districtsArr, setDistricts] = useState(states.states[0].districts)
  const [captcha, setCaptcha] = useState("")
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const randomCaptcha = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
    setCaptcha(randomCaptcha)
  }

  const verifyCaptcha = () => {
    if (formData.captchaInput === captcha) {
      setCaptchaVerified(true)
      toast.success("Captcha verified successfully!")
    } else {
      toast.error("Captcha is incorrect, please try again.")
      setCaptchaVerified(false)
      generateCaptcha()
    }
  }

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    if (name === "state") {
      const selectedState = states.states.find(
        stateObj => stateObj.state === value
      )
      if (selectedState) setDistricts(selectedState.districts)
      else setDistricts([])
    }
  }

  const sendOtp = async () => {
    setOtpSent(true)
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email: formData.email,
      })
      setFormData(prevData => ({
        ...prevData,
        generatedOtp: response.data.otp,
      }))
      // setOtpSent(true) // TODO: changed here
      toast.success("OTP sent to Entered Mail Successfully!")
    } catch (error) {
      toast.error("Error sending OTP")
      console.log(error)
    }
  }

  const verifyOtp = async () => {
    setOtpVerified(true)
    if (formData.otp.toUpperCase() === formData.generatedOtp.toUpperCase()) {
      // setOtpVerified(true) //TODO: changed here
      toast.success("OTP verified successfully!")
    } else {
      toast.error("OTP verification failed")
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (isSignUp) {
        const response = await axios.post("http://localhost:5000/signup", {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          address: formData.address,
          state: formData.state,
          district: formData.district,
          ward: formData.ward,
          password: formData.password,
        })

        toast.success(response.data || "User registered successfully")
        localStorage.setItem("token", response.data.token)

        setFormData({
          email: "",
          password: "",
          name: "",
          mobile: "",
          address: "",
          state: "",
          district: "",
          ward: "",
          captchaInput: "",
          otp: "",
        })
        navigate("/dashboard")
      } else {
        const response = await axios.post("http://localhost:5000/signin", {
          mobile: formData.mobile,
          password: formData.password,
        })
        toast.success(response.data || "User logged in successfully")
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data)
      } else {
        if (error.response && error.response.status === 409)
          toast.error(error.response.data.message)
        else toast.error("An error occurred while processing your request.")
      }
    }
  }

  return (
    <div className='flex items-center justify-center container'>
      <div className='p-4 bg-light-green shadow-lg w-full md:w-1/2 rounded-xl'>
        <div className='mb-6 w-full slider-btn border-2 border-medium-green rounded-xl shadow-lg flex overflow-hidden'>
          <button
            type='button'
            className={`transition-colors duration-300
              ${!isSignUp ? "notActiveBtn" : "activeBtn"}`}
            onClick={() => setIsSignUp(false)}>
            <p>Sign In</p>
            <p>(Existing User)</p>
          </button>
          <button
            type='button'
            className={`transition-colors duration-300
              ${isSignUp ? "notActiveBtn" : "activeBtn"}`}
            onClick={() => setIsSignUp(true)}>
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
              />
              <div className='flex gap-x-1'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                />
                <button type='button' onClick={sendOtp} className='btn'>
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
                  />
                  <button type='button' onClick={verifyOtp} className='btn'>
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
                  />

                  <input
                    type='number'
                    name='mobile'
                    placeholder='Mobile Number'
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className='flex gap-x-2 text-sm'>
                    <select
                      name='state'
                      value={formData.state}
                      onChange={handleChange}>
                      {states.states.map((stateObj, index) => (
                        <option key={index} value={stateObj.state}>
                          {stateObj.state}
                        </option>
                      ))}
                    </select>
                    <select
                      name='district'
                      value={formData.district}
                      onChange={handleChange}>
                      {districtsArr.map((district, index) => (
                        <option key={`${index}`} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name='ward'
                    value={formData.ward}
                    onChange={handleChange}
                    placeholder='Select Ward'>
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
                type='number'
                name='mobile'
                placeholder='Mobile No'
                value={formData.mobile}
                onChange={handleChange}
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
              />

              <div className='flex items-center gap-x-1 text-sm'>
                <input
                  type='text'
                  value={captcha}
                  disabled
                  className='text-center'
                />
                <input
                  type='text'
                  name='captchaInput'
                  placeholder='Enter Captcha'
                  value={formData.captchaInput}
                  onChange={handleChange}
                  className='text-center'
                />
                <button type='button' className='btn' onClick={verifyCaptcha}>
                  Verify
                </button>
              </div>
            </>
          )}
          <button
            type='submit'
            disabled={
              (isSignUp && !otpVerified) || (!isSignUp && !captchaVerified)
            }
            className={`btn mt-4 ${
              (isSignUp && otpVerified) || (!isSignUp && captchaVerified)
                ? "bg-green-hover"
                : "button-disabled"
            }`}>
            {!isSignUp ? "Log In" : "Get Started"}
          </button>
          <Seperator />
          <button
            className='btn'
            onClick={() => navigate("/adminAuth")}
            type='button'>
            Switch to Admin
          </button>
        </form>
      </div>
    </div>
  )
}
