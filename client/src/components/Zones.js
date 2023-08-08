import "../styling/zone.css"

import React, {useRef, useEffect, useState} from "react"

function Zones() {
    //measures the plantbed div
    const divRef = useRef(null)
    const [plantbedDim, setPlantbedDim] = useState({
        width : 0,
        height : 0
    })
    useEffect(() => {
        const dimensions = divRef.current.getBoundingClientRect()
        setPlantbedDim({
            width : dimensions.width,
            height : dimensions.height
        })
    }, [])
    

    const carrot = {
        'name' : "carrot",
        'color' : 'orange',
        'width' : `${plantbedDim.width /2}`
    }

    console.log(carrot.width)

    // const addPlant = (e) => {
    //     plant = {

    //     }
    // }

    // const renderPlants = plantCollection.map((plant) => {
    //     return (
    //         <div
    //             key={plant.id}
    //             style={{
    //                 width: plant.width,
    //                 backgroundColor: plant.color
    //                 }}
    //             className="plant"
    //         ></div>
    //     )
    // })

    return (
        <div>
            <div className="plantbed_container">
                <div className="plantbed" ref={divRef}>
                    {/* {renderPlants} */}
                </div>
            </div>
            <div>
                {/* <button onClick={addPlant}>Add Veg</button> */}
            </div>
        </div>
    )
}

export default Zones;