import "../styling/zone.css"

import React, { useRef, useEffect, useState } from "react"

function Zones({unsortedPlants, setUnsortedPlants}) {
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
    //                         id: 1,
    //                         plantlist:
    //                     },
    //                     {
    //                         id: 2,
    //                         plantlist: 
    //                     },
    //                     {
    //                         id: 3,
    //                         plantlist:
    //                     }
    //                 ],
    //                 city: 1,
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Frontyard',
    //                 zones: [
    //                     {
    //                         id: 1,
    //                         plantlist:
    //                     },
    //                     {
    //                         id: 2,
    //                         plantlist:
    //                     }
    //                 ],
    //                 city: 2,
    //             },
    //         ]
    //     }
    //console.log(user.greenhouses[0].zones[0].id[0])
    
    //planter info
    const [selectedPlant, setSelectedPlant] = useState('')
    const [quantity, setQuantity] = useState('')
    // const [unsortedPlants, setUnsortedPlants] = useState([])

    const [showFooter, setShowFooter] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            const mouseY = e.clientY
            const windowHeight = window.innerHeight
            const threshold = 50
            const distanceFromBottom = windowHeight - mouseY

            if (distanceFromBottom <= threshold) {
                setShowFooter(true)
            } else {
                setShowFooter(false)
            }
        }
        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

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

  // fetches all plants in our db
    const [allPlants, setAllPlants] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5555/plants")
        .then((response) => response.json())
        .then((plants) => setAllPlants(plants))
        .catch((error) => {
            console.error("Error fetching plants:", error);
        });
    }, []);

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
    // const [tempIsActive, setTempIsActive] = useState(false)
    // const handleToggle = () => {
    //     setTempIsActive(prevState => !prevState)
    //     // console.log(allPlants[1].temperature_range)
    //     // console.log(tempColors.filter)
    // }

    const [displayState, setDisplayState] = useState('base')

    const tempColors = {
        1 : '#bf3a22',
        2 : '#b5941d',
        3 : '#228734',
        4 : '#0f2863'
    }

    const handleToggleTemp = () => {
        if (displayState === 'base' || displayState === 'sun' || displayState === 'moist') {
            setDisplayState('temp');
        } else if (displayState === 'temp') {
            setDisplayState('base');
        }
    }

    const sunColors = {
        1 : '#d4aa1e',
        2 : '#d47f1e',
        3 : '#ba3a1a'
    }
    
    const handleToggleSun = () => {
        if (displayState === 'base' || displayState === 'temp' || displayState === 'moist') {
            setDisplayState('sun');
        } else if (displayState === 'sun') {
            setDisplayState('base');
        }
    }

    const moistColors = {
        1 : '#36a5e0',
        2 : '#2b7bbd',
        3 : '#1b518f',
        4 : '#0f2863'
    }

    const handleToggleMoist = () => {
        if (displayState === 'base' || displayState === 'temp' || displayState === 'sun') {
            setDisplayState('moist');
        } else if (displayState === 'moist') {
            setDisplayState('base');
        }
    }

    console.log(displayState)

    //renders plants and sets the span by the plant diameter
    const renderPlants = unsortedPlants.map((plant, index) => {
        const plantSize = plant.diameter * inch;
        const multiplesOfFour = Math.ceil(plant.diameter / 4) * 4;
    
        // Determine the background color based on displayState
        let bgColor;
        if (displayState === 'sun') {
            bgColor = sunColors[plant.sunlight_range];
        } else if (displayState === 'temp') {
            bgColor = tempColors[plant.temperature_range];
        } else if (displayState === 'moist') {
            bgColor = tempColors[plant.moisture_range];
        } else {
            bgColor = plant.color;
        }
    
        return (
            <div className="plant_container" style={{ gridRow: `span ${multiplesOfFour}`, gridColumn: `span ${multiplesOfFour}` }} key={index}>
                <div
                    id={`plant-${plant.id}`}
                    key={unsortedPlants.index}
                    style={{
                        width: plantSize + 'px',
                        height: plantSize + 'px',
                        backgroundColor: bgColor,
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
        return (
            <div key={name} className="plant_info">
                <div className="color_swatch" style={{backgroundColor: filteredPlant[0].color}}><h5 className="number_in_circle">x{nameCounts[name]}</h5></div>
                <h4 className="plant_title">{name.toLowerCase()}</h4><h5 className="yield">(Expected Yield : <span>{nameCounts[name] * filteredPlant[0].expected_yield} Total</span>)</h5>
            </div>
        )
    })

    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = (e) => {
        setIsEditing(!isEditing)
    }
    console.log(allPlants)

    // console.log(unsortedPlants)

    return (
        <div className="body_page">
            <div className="page_container">
                <div className="zone_container">
                    <div className="plantbed_container">
                        <div className="plantbed" style={plantBedGrid} ref={divRef}>
                            {renderPlants}
                        </div>
                        <div className="plant_info_container">
                            <div className="plant_info_box">
                                {plantInfo}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="zone_container">
                    <div className="plantbed_info">
                        <h2>Zone</h2>
                        <h6 className="expected_disclaimer">Expected Yield is the Amount of Plants Expected to Harvest From These Seeds*</h6>
                    </div>
                    <div className="edit_container">
                        {isEditing ? 
                            <div id="submit_container">      
                                <form onSubmit = {handleSubmit}>
                                    <label>
                                        <select className='dropdown' value={selectedPlant.name} onChange={handlePlantChange}>
                                            <option value='' disabled>Select Your Vegetable...</option>
                                            {allPlants.map(item => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        {/* Quantity: */}
                                        <input className='input_field' type='number' value={quantity} onChange={handleQuantityChange} />
                                    </label>
                                    <button className="add_button" type='submit'>ADD</button>
                                </form>
                            </div>
                            :
                            <button className="edit_button" onClick={() => {
                                handleEdit()
                            }}>Edit This Zone
                            </button>
                        }
                        <button className="edit_button">Submit Changes</button>
                    </div>
                </div>
            </div>
            <div className="submit_footer">
                <div className="button_container">
                    View By Temperature
                    <button className={`toggle_button ${displayState === 'temp' ? 'active' : ''}`} onClick={handleToggleTemp}>
                        {displayState === 'temp' ? '' : ''}
                    </button>
                </div>
                <div className="button_container">
                    View By Sunlight
                    <button className={`toggle_button ${displayState === 'sun' ? 'active' : ''}`} onClick={handleToggleSun}>
                        {displayState === 'sun' ? '' : ''}
                    </button>
                </div>
                <div className="button_container">
                    View By Moisture
                    <button className={`toggle_button ${displayState === 'moist' ? 'active' : ''}`} onClick={handleToggleMoist}>
                        {displayState === 'moist' ? '' : ''}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Zones;