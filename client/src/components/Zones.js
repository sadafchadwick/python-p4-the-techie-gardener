import "../styling/zone.css"

import React, { useRef, useEffect, useState } from "react"

function Zones() {
    //window size state
    const [windowSize, setWindowSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    //changes window size
    const handleWindowSize = () => {
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }

    //listens for changes to window size
    useEffect(() => {
        window.addEventListener('resize', handleWindowSize)
        return () => (
            window.removeEventListener('resize', handleWindowSize)
        )
    }, [])

    //measures the plantbed div
    const divRef = useRef(null)
    const [plantbedDim, setPlantbedDim] = useState({
        width: 0,
        height: 0
    })
    useEffect(() => {
        const dimensions = divRef.current.getBoundingClientRect()
        setPlantbedDim({
            width: dimensions.width,
            height: dimensions.height
        })
    }, [windowSize])

    //measures an inch for other values
    let plantbedSize = 7 //this number comes from database for the width of the planter
    const foot = plantbedDim.width / plantbedSize
    const inch = foot / 12

    //////////

    const maxPlants = Math.floor(
        (plantbedDim.width * plantbedDim.height) / (3 * inch * 3 * inch)
    );
    const [planterCount, setPlanterCount] = useState([])

    const addCarrot = () => {
        
        if (planterCount.length > maxPlants) {
            // Show an error message if there's no more space
            console.log("No more space to plant!");
            return;
        }

        const carrot = {
            // 'key' : `${planterCount.length + 1}`,
            name: "carrot",
            color: "orange",
            width: `${3 * inch}`,
            height: `${3 * inch}`,
        };
        setPlanterCount([...planterCount, carrot]);
    };

    const renderPlants = planterCount.map((plant, index) => (
        <div
            key={index} // Use index as key since there's no unique ID
            style={{
                width: plant.width + "px",
                height: plant.height + "px",
                backgroundColor: plant.color,
            }}
            className="plant"
        ></div>
    ));

    return (
        <div>
            <div className="plantbed_container">
                <div className="plantbed" ref={divRef}>
                    {renderPlants}
                </div>
            </div>
            {planterCount.length >= maxPlants && (
                <div>
                    <p>No more space to plant!</p>
                </div>
            )}
            <div>
                <button onClick={addCarrot}>Add Veg</button>
            </div>
        </div>
    );

}

    export default Zones;

    

