import React, { useState, useEffect } from "react";
import { greenhousesMockData } from "../mockData";
import "../styling/greenhouses.css";
import Greenhouse from "./Greenhouse";

function Greenhouses({ loggedIn }) {
  const [greenhouses, setGreenhouses] = useState(greenhousesMockData);

  useEffect(() => {
    // Fetch current greenhouses from the API and set the state
    fetch('/greenhouses')
      .then(response => response.json())
      .then(data => {
        setGreenhouses(data);
      })
      .catch(error => {
        console.error('Error fetching greenhouses:', error);
      });
  }, []);

  const handleAddGreenhouse = () => {
    // Add a new greenhouse via API and update the state
    fetch('/greenhouses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(newGreenhouse => {
        setGreenhouses([...greenhouses, newGreenhouse]);
      })
      .catch(error => {
        console.error('Error adding greenhouse:', error);
      });
  };

  return (
    <div>
      <h2>Greenhouses</h2>
      <div className="greenhouse-card-grid">
        {greenhouses.map((greenhouse) => (
          <Greenhouse id={greenhouse.id} />
        ))}
        <div className="greenhouse-card">
          <button onClick={handleAddGreenhouse}>Add Greenhouse</button>
        </div>
      </div>
    </div>
  );
}

export default Greenhouses;
