import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../styling/greenhouses.css";

function Greenhouses({ loggedIn }) {
  const [greenhouses, setGreenhouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/greenhouses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGreenhouses(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);


  return (
    <div>
      <h2>Greenhouses</h2>
      <div className="greenhouse-card-grid">
        {greenhouses.map((greenhouse) => (
          <div key={greenhouse.id} className="greenhouse-card">
            <h3>Greenhouse {greenhouse.id}</h3>
            <p>Air Temperature: {greenhouse.air_temp}</p>
            <p>Humidity: {greenhouse.humidity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Greenhouses;
