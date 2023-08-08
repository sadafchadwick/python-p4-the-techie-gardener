import React, { useState, useEffect } from "react";

function Greenhouses() {
  const [greenhouses, setGreenhouses] = useState([]);

  useEffect(() => {
    fetch("/greenhouses")
      .then((response) => response.json())
      .then((data) => {
        setGreenhouses(data.greenhouses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Greenhouses</h2>
      <ul>
        {greenhouses.map((greenhouse) => (
          <li key={greenhouse.id}>
            {/* Render relevant information about the greenhouse */}
            <p>ID: {greenhouse.id}</p>
            <p>Air Temperature: {greenhouse.air_temp}</p>
            {/* Add more attributes as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Greenhouses;
