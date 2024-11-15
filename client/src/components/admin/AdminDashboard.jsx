import {useState} from "react"

export default function AdminDashboard({username, states, wards}) {
  const [districtsArr, setDistricts] = useState(states.states[0].districts)
  const handleChange = e => {
    const {name, value} = e.target
    if (name === "state") {
      const selectedState = states.states.find(
        stateObj => stateObj.state === value
      )
      if (selectedState) setDistricts(selectedState.districts)
      else setDistricts([])
    }
  }
  return (
    <div className='container'>
      <h2 className='my-2'>Hi, {username}!</h2>
      <h3>Details of ward</h3>
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
    </div>
  )
}
