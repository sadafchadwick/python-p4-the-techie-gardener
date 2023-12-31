// import "../styling/plants.css"
// import React, { useState, useEffect } from "react";

// function Plants(unsortedPlants, setUnsortedPlants) {
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5555/plants")
//       .then((response) => response.json())
//       .then((data) => {
//         setPlants(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching plant data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Plants</h2>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {plants.map((plant) => (
//           <li
//             key={plant.id}
//             style={{
//               margin: "10px 0",
//               padding: "10px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <p>Name: {plant.name}</p>
//             <p>Diameter: {plant.diameter}</p>
//             <p>Planted On: {plant.planted_on}</p>
//             <p>Height: {plant.height}</p>
//             <p>Expected Yield: {plant.expected_yield}</p>
//             <p>Temperature Range: {plant.temperature_range}</p>
//             <p>Moisture Range: {plant.moisture_range}</p>
//             <p>Sunlight Range: {plant.sunlight_range}</p>
//             <p>Symbiotic Relations: {plant.symbiotic_relations}</p>
//             <p>Growth Time: {plant.growth_time}</p>
//             <p>
//             Color: <span className="color_example" style={{ backgroundColor: plant.color, display: "inline-block", width: "20px", height: "20px", verticalAlign: "middle", marginRight: "5px" }}></span>
//           </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Plants;

import "../styling/plants.css";
import React, { useState, useEffect } from "react";



function Plants({ unsortedPlants }) {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5555/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
      });
  }, []);

  console.log(plants)
  console.log(unsortedPlants)

  return (
    <div>
      <h2>Plants</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {unsortedPlants.map((plant, index) => (
          <li
            key={index} // Use the index as the key if plant.id is not unique
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <p>Name: {plant.name}</p>
            <p>Diameter: {plant.diameter}</p>
            {/* Add other properties here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Plants;
