import React, { useState, useEffect } from "react";

function Greenhouses() {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Greenhouses</h2>
      <ul>
        {greenhouses.map((greenhouse) => (
          <li key={greenhouse.id}>
            {/* Render relevant information about the greenhouse */}
            <p>ID: {greenhouse.id}</p>
            <p>Air Temperature: {greenhouse.air_temp}</p>
            <p>Humidity: {greenhouse.humidity}</p>
            {/* Add more attributes as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Greenhouses;
