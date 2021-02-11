import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ActivityInfo from '../../components/Info/ActivityInfo'
import EditActivity from '../../components/PostActivity/EditPost'

const editActivity = () => {
    return (
        <div>
            <Navbar/>
            <EditActivity/>
        </div>
    )
}

export default editActivity
