import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/greenhouses.css";

function Greenhouses({ loggedIn }) {
  const [greenhouses, setGreenhouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGreenhousesData();
  }, []);

  const fetchGreenhousesData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/greenhouses");
      setGreenhouses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleAddZone = async (greenhouseId) => {
    try {
      // Send a POST request to add a new zone
      await axios.post(`/api/greenhouses/${greenhouseId}/zones`);
      
      // Fetch the updated greenhouses data and update the state
      await fetchGreenhousesData();
    } catch (error) {
      console.error('Error adding zone:', error);
    }
  };

  return (
    <div>
      <h2>Greenhouses</h2>
      <div className="greenhouse-card-grid">
        {greenhouses.map((greenhouse) => (
          <div key={greenhouse.id} className="greenhouse-card">
            <h3>Greenhouse {greenhouse.id}</h3>
            <h4>Zones:</h4>
            <ul>
              {greenhouse.zones.map((zone) => (
                <li key={zone.id}>Zone {zone.id}</li>
              ))}
            </ul>
            <button onClick={() => handleAddZone(greenhouse.id)}>Add Zone</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Greenhouses;
