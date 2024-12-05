import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Seperator from "../common/seperator"
import {toast} from "react-toastify"
import config from '../../config';
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

  const handleSubmit = async e => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${config.backendUrl}adminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: formData.state,
          district: formData.district,
          ward: formData.ward,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminAuthToken", data.token);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  

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
          <button type='submit' className='btn mt-4' onClick={handleSubmit}>
            Login
          </button>
          <Seperator />
          <button
            className='btn'
            type='button'
            onClick={() => navigate("/auth")}>
            Switch to User
          </button>
        </form>
      </div>
    </div>
  )
}
