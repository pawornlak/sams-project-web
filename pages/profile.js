import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import ProfileToggle from '../components/Toggle/ProfileToggle'
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"; 

let style = {
	color: "rgb(255, 0, 0)",
	backgroundColor: "#f77f00",
    height: "40px",
    width: "40px"
}
const profile = () => {
    return (
        <div>
            <Navbar/>
            <ProfileToggle/>
            <ScrollUpButton style={style}/>
        </div>
    )
}

export default profile
