import "../styling/zone.css"

import React, { useRef, useEffect, useState } from "react"

function Zones() {
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

    //calculates max amount of plants
    const maxPlants = Math.floor(
        (plantbedDim.width * plantbedDim.height) / (3 * inch * 3 * inch)
    );

    //planter info
    const [planterCount, setPlanterCount] = useState([])

    //chooses selected plant from dropdown menu and sets selectedPlant to obj on dropdown
    const [selectedPlant, setSelectedPlant] = useState('')
    const handleOptionChange = (e) => {
        const selectedValue = e.target.value
        const selectedObj = allPlants.find(item => item.name === selectedValue)
        setSelectedPlant(selectedObj)
    }

    //adds plants to planterCount
    const addPlant = () => {
        if (planterCount.length > maxPlants) {
            // Show an error message if there's no more space
            console.log("No more space to plant!");
            return;
        }
        const plant = {
            name: selectedPlant.name,
            width: selectedPlant.diameter * inch,
            height: selectedPlant.diameter * inch,
            color: selectedPlant.color
        }
        setPlanterCount([...planterCount, plant]);
    }

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

    const quadrantStyle = {
        width:`${plantbedDim.width / 2}px`,
        height:`${plantbedDim.height / 2}px`,
    }

    let maxWidth = 0
    let maxHeight = 0
    let maxObject = null

    for (const obj of alignedPlants) {
        if (obj.width > maxWidth) {
            maxWidth = obj.width
            maxHeight = obj.height
            maxObject = obj
        }
    }

    let columnCount = plantbedDim.width / maxWidth
    let columnWidth = 100 / columnCount

    let rowCount = plantbedDim.height / maxHeight
    let rowWidth = 100 / rowCount

    // const plantBedColumns = {
    //     gridTemplateColumns: `repeat(${columnCount}, ${columnWidth}%)`,
    //     gridTemplateRows:`repeat(${rowCount}, ${rowWidth}%)`,
    //     backgroundColor: 'blue'
    // }
    console.log(columnCount, columnWidth)
    // console.log(plantBedColumns)

    return (
        <div>
            <div className="plantbed_container">
                <div className="plantbed" style={{
                    gridTemplateColumns: `repeat(${columnCount}, ${columnWidth}%)`,
                    gridTemplateRows:`repeat(${rowCount}, ${rowWidth}%)`,
                    backgroundColor: 'blue'
                    }} ref={divRef}>
                    {renderPlants}
                    {/* <div className="quadrant" id='1' style={{backgroundColor:'blue', ...quadrantStyle}}>1</div>
                    <div className="quadrant" id='2' style={{backgroundColor:'red', ...quadrantStyle}}>2</div>
                    <div className="quadrant" id='3' style={{backgroundColor:'green', ...quadrantStyle}}>3</div>
                    <div className="quadrant" id='4' style={{backgroundColor:'yellow', ...quadrantStyle}}>4</div> */}
                </div>
            </div>
            {planterCount.length >= maxPlants && (
                <div>
                    <p>No more space to plant!</p>
                </div>
            )}
            <div>
                <select value={selectedPlant.name} onChange={handleOptionChange}>
                    <option value=''>Select...</option>
                    {allPlants.map(item => (
                        <option key={item.id} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <button onClick={addPlant}>Add</button>
            </div>
        </div>
    );

}

    export default Zones;

    

