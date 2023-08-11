import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styling/greenhouses.css";
import Zone from "./Zone";

function Greenhouse({ id }) {
  const [currentZones, setCurrentZones] = useState([]);

  useEffect(() => {
    // Fetch current zones for the greenhouse from the API and set the state
    fetch(`/greenhouses/${id}`)
      .then(response => response.json())
      .then(data => {
        setCurrentZones(data.zones);
      })
      .catch(error => {
        console.error('Error fetching zones:', error);
      });
  }, [id]);

  const handleDeleteZone = (zoneId) => {
    // Delete the zone via API and update the state
    fetch(`/zones/${zoneId}`, { method: "DELETE" })
      .then(() => {
        setCurrentZones(currentZones.filter(zone => zone.id !== zoneId));
      })
      .catch(error => {
        console.error('Error deleting zone:', error);
      });
  };

  const handleAddZone = () => {
    // Add a new zone via API and update the state
    fetch('/zones', { method: "POST" })
      .then(response => response.json())
      .then(data => {
        setCurrentZones([...currentZones, data]);
      })
      .catch(error => {
        console.error('Error adding zone:', error);
      });
  };

  return (
    <div className="greenhouse-card">
      <h3>Greenhouse {id}</h3>
      <h1><span>Air Temp:</span><span>humidity:</span></h1>
      <h4>Zones:</h4>
      <ul>
        {currentZones.map((zone) => (
          <li className="greenhouse-card-listitem" key={zone.id}>
            <span>Zone {zone.id}</span>
            <div>
              <NavLink to={`/zones/${zone.id}`}>View</NavLink>
              &nbsp;
              <button onClick={() => handleDeleteZone(zone.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      {currentZones.length < 5 && <button onClick={handleAddZone}>Add Zone</button>}
    </div>
  );
}

export default Greenhouse;
