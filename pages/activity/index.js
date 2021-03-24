import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ActivityCard from '../../components/Card/ActivityCard'
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"; 

let style = {
	color: "rgb(255, 0, 0)",
	backgroundColor: "#f77f00",
    height: "40px",
    width: "40px"
}

const main = () => {
    return (
        <div>
            <Navbar />
            Activities Page
            for web
            SAMS
            <ActivityCard />
            <ScrollUpButton 
                style={style}
            />
        </div>
    )
}

export default main
