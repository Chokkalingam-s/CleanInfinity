import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Seperator from "../common/seperator"

export default function AdminAuth({states, wards}) {
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
  const navigate = useNavigate()
  const [districtsArr, setDistricts] = useState(states.states[0].districts)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    if (name === "state") {
      const selectedState = states.states.find(
        (stateObj) => stateObj.state === value
      )
      if (selectedState) setDistricts(selectedState.districts)
      else setDistricts([])
    }
  }
  return (
    <div className='flex items-center justify-center container'>
      <div className='p-4 w-full md:w-1/2 drop'>
        <h2 className='mb-4 pl-1'>Welcome Admin!</h2>
        <form>
          <select name='state' value={formData.state} onChange={handleChange}>
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
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type='submit'
            className={"btn mt-4"}
            onClick={() => navigate("/AdminDashboard")}>
            Login
          </button>
          <Seperator />
          <button className='btn' type='button' onClick={() => navigate("/")}>
            Switch to User
          </button>
        </form>
      </div>
    </div>
  )
}
