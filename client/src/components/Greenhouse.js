import React, { useState, useEffect } from "react";
import { zonesMockData } from "../mockData";
import axios from "axios";
import "../styling/greenhouses.css";
import Zone from "./Zone";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Greenhouse({ id }) {
  const [currentZones, setCurrentZones] = useState([]);

  useEffect(() => {
    // Fetch current zones for the greenhouse from the API and set the state
    axios.get(`/api/zones`)
      .then(response => {
        setCurrentZones(response.data);
      })
      .catch(error => {
        console.error('Error fetching zones:', error);
      });

    setCurrentZones(zonesMockData[id] || []);
  }, [id]);

  const handleDeleteZone = (zoneId) => {
    // Delete the zone via API and update the state
    axios.delete(`/api/zones/${zoneId}`)
      .then(() => {
        setCurrentZones(currentZones.filter(zone => zone.id !== zoneId));
      })
      .catch(error => {
        console.error('Error deleting zone:', error);
      });
  };

  const handleAddZone = () => {
    // Add a new zone via API and update the state
    axios.post(`/api/greenhouses/${id}/zones`)
      .then(response => {
        setCurrentZones([...currentZones, response.data]);
      })
      .catch(error => {
        console.error('Error adding zone:', error);
      });
  };

  return (
    <div className="greenhouse-card">
      <h3>Greenhouse {id}</h3>
      <h4>Zones:</h4>
      <ul>
        {currentZones.map((zone) => (
          <li className="greenhouse-card-listitem" key={zone.id}>
            <span>Zone {zone.id}</span>
            <div>
              <NavLink to={`/zone/${zone.id}`}>View</NavLink>
              &nbsp;
              <button onClick={() => handleDeleteZone(zone.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      {currentZones.length < 5 && <button onClick={() => handleAddZone}>Add Zone</button>}
    </div>
  );
}

export default Greenhouse;
