import {useState} from 'react'

const Location = () => {
  const [location, setLocation] = useState({latitude: null, longitude: null})
  const [error, setError] = useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        error => setError(error.message),
        {enableHighAccuracy: true} // High precision enabled
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div>
      <button onClick={getLocation}>Get High-Precision Location</button>
      {location.latitude && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  )
}

export default Location
