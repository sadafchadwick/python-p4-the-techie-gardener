import "../styling/zone.css"

import React, { useRef, useEffect, useState } from "react"

function Zones() {
    //placeholder user info
    const user = 
        {
            id: 1,
            name: 'Nolan',
            greenhouses: [
                {
                    id: 1,
                    name: 'Backyard',
                    zones: [
                        {
                            id: 1
                        },
                        {
                            id: 2
                        },
                        {
                            id: 3
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Frontyard',
                    zones: [
                        {
                            id: 1
                        },
                        {
                            id: 2
                        }
                    ]
                },
            ]
        }
    //console.log(user.greenhouses[0].zones[0].id[0])
    
    //planter info
    const [selectedPlant, setSelectedPlant] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unsortedPlants, setUnsortedPlants] = useState([])
    //window size state
    const [windowSize, setWindowSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    //measures the plantbed div
    const divRef = useRef(null)
    const [plantbedDim, setPlantbedDim] = useState({
        width: 0,
        height: 0
    })

    //fetches all plants in our db
    const [allPlants, setAllPlants] = useState([])
    useEffect(() => {
        fetch('http://localhost:5555/plants')
        .then(r => r.json())
        .then(plants => setAllPlants(plants))
    }, [])

    //listens for changes to window size
    useEffect(() => {
        window.addEventListener('resize', handleWindowSize)
        return () => (
            window.removeEventListener('resize', handleWindowSize)
        )
    }, [])

    //calculates the plant bed dimensions
    useEffect(() => {
        const dimensions = divRef.current.getBoundingClientRect()
        setPlantbedDim({
            width: dimensions.width,
            height: dimensions.height,
            bottom: dimensions.bottom
        })
    }, [windowSize])

    //changes window size
    const handleWindowSize = () => {
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }

    //measures an inch for other values
    let plantbedSize = 7 //this number comes from database for the width of the planter
    const foot = plantbedDim.width / plantbedSize
    const inch = foot / 12

    //sets up size of grid
    let columnCount = Math.floor(plantbedDim.width / inch)
    let columnWidth = 100 / columnCount
    let rowCount = Math.floor(plantbedDim.height / inch)
    let rowWidth = 100 / rowCount
    const plantBedGrid = {
        gridTemplateColumns: `repeat(${columnCount}, ${columnWidth}%)`,
        gridTemplateRows:`repeat(${rowCount}, ${rowWidth}%)`,
    }

    //calculates max amount of plants
    const maxPlants = Math.floor(
        (plantbedDim.width * plantbedDim.height) / (3 * inch * 3 * inch)
    );

    //sets which new plant is to be added
    const handlePlantChange = (e) => {
        const selectedValue = e.target.value
        const selectedObj = allPlants.find(item => item.name === selectedValue)
        setSelectedPlant(selectedObj)
    }

    //sets quantity of new plants to be added
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
        setTempDeleteCount(e.target.value)
    }

    //adds new plants (with quantity) to unsorted plant list
    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedPlant && quantity) {
            for (let i = 0; i < quantity; i++){
                unsortedPlants.push(selectedPlant)
            }
            setQuantity('')
        }
    }

    // actually deletes the plant after double clicked
    const deletePlant = (index) => {
        const updatedPlants = [...unsortedPlants]
        updatedPlants.splice(index, 1)
        setUnsortedPlants(updatedPlants)
    }

    // double click to remove plant
    const handlePlantDoubleClick = (index) => {
        deletePlant(index)
    }

    // single click to find more info about particular plant
    const moreInfoClick = (index) => {
        console.log(unsortedPlants[index])
    }

    //handles delete states (temp and when it's active)
    const [deleteCount, setDeleteCount] = useState(0)
    const [tempDeleteCount, setTempDeleteCount] = useState(0)

    //when this is fired, the attempted quantity of plants will fail
    useEffect(() => {
        if (deleteCount > 0) {
            deleteOverflowPlants()
            setDeleteCount(prevCount => prevCount - 1)
            // console.log('firing')
            alert('There Isn\'t Enough Space for You to Plant Your Selection!')
        }
    }, [deleteCount])

    //slices the overflow plants from unsorted plants
    const deleteOverflowPlants = () => {
        setUnsortedPlants((prevPlants) => prevPlants.slice(0, -1));
    };

    //used to measure plant divs to see when they need to be removed
    const plantRef = useRef(null);

    //watches for any plant divs that go passed our planter bed
    useEffect(() => {
        const plantDiv = plantRef.current;
        if (plantDiv) {
            const divLocation = plantDiv.getBoundingClientRect();
            if (divLocation.bottom > plantbedDim.bottom) {
                setDeleteCount(tempDeleteCount)
            } else {
                setDeleteCount(0)
            }
        }
    }, [unsortedPlants.length]);

    //changes state of button selected for temp
    const [tempIsActive, setTempIsActive] = useState(false)
    const handleToggle = () => {
        setTempIsActive(prevState => !prevState)
        console.log(allPlants[1].temperature_range)
        console.log(tempColors.filter)
    }
    const tempColors = {
        1 : '#36a5e0',
        2 : '#2b7bbd',
        3 : '#1b518f',
        4 : '#0f2863'
    }

    //renders plants and sets the span by the plant diameter
    const renderPlants = unsortedPlants.map((plant, index) => {
        const plantSize = plant.diameter * inch;
        const multiplesOfFour = Math.ceil(plant.diameter / 4) * 4;
    
        // Determine the background color based on tempIsActive
        const backgroundColor = tempIsActive ? tempColors[plant.temperature_range] : plant.color;
    
        return (
            <div className="plant_container" style={{ gridRow: `span ${multiplesOfFour}`, gridColumn: `span ${multiplesOfFour}` }} key={index}>
                <div
                    id={`plant-${plant.id}`}
                    key={unsortedPlants.index}
                    style={{
                        width: plantSize + 'px',
                        height: plantSize + 'px',
                        backgroundColor: backgroundColor,
                    }}
                    className="plant"
                    onClick={() => moreInfoClick(index)}
                    onDoubleClick={() => handlePlantDoubleClick(index)}
                    ref={plantRef}
                ></div>
            </div>
        );
    });

    const nameCounts = unsortedPlants.reduce((accumulator, plant) => {
        const name = plant.name
        if (accumulator[name]) {
          accumulator[name] += 1;
        } else {
          accumulator[name] = 1;
        }
        return accumulator;
    }, {});

    //maps through unsortedplants for info at bottom
    const plantInfo = Object.keys(nameCounts).map((name) => {
        const filteredPlant = unsortedPlants.filter(obj => obj.name === name)
        console.log(filteredPlant[0])
        return (
            <div key={name} className="plant_info">
                <div className="color_swatch" style={{backgroundColor: filteredPlant[0].color}}></div>
                {name} X {nameCounts[name]} (Expected Yield : {nameCounts[name] * filteredPlant[0].expected_yield} Total)
            </div>
        )
    })

    return (
        <div className="page_container">
            <div className="zone_container">
                <div className="plantbed_container">
                    <div className="plantbed" style={plantBedGrid} ref={divRef}>
                        {renderPlants}
                    </div>
                    <div className="plant_info_container">
                        {plantInfo}
                    </div>
                </div>
            </div>
            <div className="submit_footer">
                <div className="button_container">
                    View By Temp
                    <button className={`toggle_button ${tempIsActive ? 'active' : ''}`} onClick={handleToggle}>
                        {tempIsActive ? '' : ''}
                    </button>
                </div>
                <form onSubmit = {handleSubmit}>
                    <label>
                        Select Your Vegetable:
                        <select value={selectedPlant.name} onChange={handlePlantChange}>
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
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    );
}

export default Zones;