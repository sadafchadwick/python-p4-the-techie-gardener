import React, { useState, useEffect } from "react";
import { greenhousesMockData } from "../mockData";
import axios from "axios";
import "../styling/greenhouses.css";
import Greenhouse from "./Greenhouse";

function Greenhouses({ loggedIn }) {
  const [greenhouses, setGreenhouses] = useState(greenhousesMockData);

  useEffect(() => {
    // Fetch current greenhouses from the API and set the state
    axios.get(`/api/greenhouses/`)
      .then(response => {
        setGreenhouses(response.data);
      })
      .catch(error => {
        console.error('Error fetching greenhouses:', error);
      });
  }, []);

  const handleAddGreenhouse = () => {
    // Add a new greenhouse via API and update the state
    axios.post(`/api/greenhouses`)
      .then(response => {
        setGreenhouses([...greenhouses, response.data]);
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
