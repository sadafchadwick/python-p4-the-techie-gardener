import "../styling/zone.css"

import React, { useRef, useEffect, useState } from "react"

function Zones() {
    //placeholder user info
    // const user = 
    //     {
    //         id: 1,
    //         name: 'Nolan',
    //         greenhouses: [
    //             {
    //                 id: 1,
    //                 name: 'Backyard',
    //                 zones: [
    //                     {
    //                         id: 1
    //                     },
    //                     {
    //                         id: 2
    //                     },
    //                     {
    //                         id: 3
    //                     }
    //                 ]
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Frontyard',
    //                 zones: [
    //                     {
    //                         id: 1
    //                     },
    //                     {
    //                         id: 2
    //                     }
    //                 ]
    //             },
    //         ]
    //     }
    //console.log(user.greenhouses[0].zones[0].id[0])

    //fetches all plants in our db
    const [allPlants, setAllPlants] = useState([])
    useEffect(() => {
        fetch('http://localhost:5555/plants')
        .then(r => r.json())
        .then(plants => setAllPlants(plants))
    }, [])

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

    //sets up size of grid
    let columnCount = Math.floor(plantbedDim.width / foot)
    let columnWidth = 100 / columnCount
    let rowCount = Math.floor(plantbedDim.height / foot)
    let rowWidth = 100 / rowCount
    const plantBedGrid = {
        gridTemplateColumns: `repeat(${columnCount}, ${columnWidth}%)`,
        gridTemplateRows:`repeat(${rowCount}, ${rowWidth}%)`,
    }

    //calculates max amount of plants
    const maxPlants = Math.floor(
        (plantbedDim.width * plantbedDim.height) / (3 * inch * 3 * inch)
    );

    //planter info
    const [planterCount, setPlanterCount] = useState([])

    //adds plants to planterCount
    const addPlant = () => {
        const availableSpace = maxPlants - unsortedPlants.length;
        
        if (availableSpace <= 0) {
            console.log("No more space to plant!");
            return;
        }

        const numPlantsToAdd = Math.min(quantity, availableSpace);
        const newPlants = Array.from({ length: numPlantsToAdd }, () => selectedPlant);

        setUnsortedPlants(prevPlants => [...prevPlants, ...newPlants]);
        setQuantity('');
    }

    const [selectedPlant, setSelectedPlant] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unsortedPlants, setUnsortedPlants] = useState([])

    //sets which new plant is to be added
    const handleVegChange = (e) => {
        const selectedValue = e.target.value
        const selectedObj = allPlants.find(item => item.name === selectedValue)
        setSelectedPlant(selectedObj)
    }

    //sets quantity of new plants to be added
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    // adds new plants (with quantity) to unsorted plant list
    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedPlant && quantity) {
            for (let i = 0; i < quantity; i++){
                unsortedPlants.push(selectedPlant)
            }
            setQuantity('')
        }
    }

    // renders the plants on screen
    const renderPlants = unsortedPlants.map((plant, index) => (
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
    console.log(unsortedPlants)

    return (
        <div>
            <div className="plantbed_container">
                <div className="plantbed" style={plantBedGrid} ref={divRef}>
                    {renderPlants}
                </div>
            </div>
            {unsortedPlants.length >= maxPlants && (
                <div>
                    <p>No more space to plant!</p>
                </div>
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Select Your Vegetable:
                        <select value={selectedPlant.name} onChange={handleVegChange}>
                            <option value=''>Select...</option>
                            {allPlants.map(item => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Quantity:
                        <input type='number' value={quantity} onChange={handleQuantityChange} />
                    </label>
                    <button
                        type='submit'
                        disabled={!selectedPlant || !quantity || unsortedPlants.length >= maxPlants}
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Zones;