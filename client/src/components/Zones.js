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

    //calculates max amount of plants
    const maxPlants = Math.floor(
        (plantbedDim.width * plantbedDim.height) / (3 * inch * 3 * inch)
    );

    //planter info
    const [planterCount, setPlanterCount] = useState([])
    
    //adds carrot to planter
    const addCarrot = () => {
        
        if (planterCount.length > maxPlants) {
            // Show an error message if there's no more space
            console.log("No more space to plant!");
            return;
        }

        const carrot = {
            name: "carrot",
            color: "orange",
            width: `${3 * inch}`,
            height: `${3 * inch}`,
        };
        setPlanterCount([...planterCount, carrot]);
    };

    //adds potatoes to planter
    const addPotato = () => {
        
        if (planterCount.length > maxPlants) {
            // Show an error message if there's no more space
            console.log("No more space to plant!");
            return;
        }

        const potato = {
            name: "potato",
            color: "brown",
            width: `${10 * inch}`,
            height: `${10 * inch}`,
        };
        setPlanterCount([...planterCount, potato]);
    };

    //sorts the planerCount by type of plant (can sort by other attributes if you change name, ie temp range)
    const sortedPlants = planterCount.slice().sort((a, b) => a.name.localeCompare(b.name))
    const alignedPlants = sortedPlants.reduce((plants, obj) => {
        plants.push(obj)
        return plants
    }, [])
    
    //renders the plants on screen
    const renderPlants = alignedPlants.map((plant, index) => (
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

    console.log(alignedPlants)

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
                <button onClick={addCarrot}>Add Carrot</button>
                <button onClick={addPotato}>Add Potato</button>
            </div>
        </div>
    );

}

    export default Zones;

    

